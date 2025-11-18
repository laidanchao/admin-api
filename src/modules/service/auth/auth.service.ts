import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { ClientStage, ClientType, UserStatus } from '@/common/enums';
import { JwtService } from '@nestjs/jwt';
import { aesEncrypt } from '@/common/crypt';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // 微信小程序配置
  private readonly WX_APPID = process.env.WX_APPID;
  private readonly WX_SECRET = process.env.WX_SECRET;

  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
    @InjectRepository(ClientEntity)
    public readonly clientRepo: Repository<ClientEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 登录
   * @param body
   */
  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
      select: ['id', 'username', 'password', 'status'],
      relations: ['roles'],
    });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (aesEncrypt(password) !== user.password) {
      throw new BadRequestException('密码有误');
    }

    if (user.status !== UserStatus.NORMAL) {
      throw new BadRequestException('用户状态异常');
    }
    const roleCodes = user.roles.map((m) => m.code);

    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      roles: roleCodes,
    });
  }

  /**
   * Client登录注册功能
   * 当输入的身份证号不存在系统时，认定为新增用户（注册）
   * 否则认定为登录，返回token
   * 登录校验规则：身份证号和手机号需匹配
   */
  async clientLoginRegister(realName: string, idNo: string, phone: string) {
    // 验证身份证号和手机号格式
    if (!this.validateIdCard(idNo)) {
      throw new BadRequestException('身份证号格式不正确');
    }
    if (!this.validatePhone(phone)) {
      throw new BadRequestException('手机号格式不正确');
    }

    // 查找是否存在该身份证号的用户
    let client = await this.clientRepo.findOne({
      where: [{ idNo }, { phone }],
    });

    if (!client) {
      // 不存在则创建新用户（注册）
      client = this.clientRepo.create({
        realName,
        idNo,
        phone,
        clientName: realName, // 使用真实姓名作为客户名称
        clientType: 'PERSONAL' as any, // 默认为个人客户
        clientStage: ClientStage.DEFAULT, // 默认为新客户
        createdBy: 'system', // 系统创建
      });
      await this.clientRepo.save(client);
    } else {
      // 存在则验证手机号是否匹配
      if (client.phone !== phone) {
        throw new BadRequestException('身份证号和手机号不匹配');
      }
    }

    // 生成token返回
    return {
      token: this.jwtService.sign({
        id: client.id,
        realName: client.realName,
        idNo: client.idNo,
        phone: client.phone,
        userType: 'client',
      }),
      realName: client.realName,
      clientId: client.id,
      idNo: client.idNo,
      phone: client.phone,
    };
  }

  /**
   * 微信小程序登录
   * 对应微信小程序的wx.login()函数
   * @param code 微信小程序登录获取的code
   * @param userInfo 微信用户信息（可选）
   */
  async wxLogin(
    code: string,
    userInfo?: {
      nickname: string;
      avatarUrl: string;
      gender: number;
      country: string;
      province: string;
      city: string;
      language: string;
    },
  ) {
    if (!code) {
      throw new BadRequestException('登录凭证不能为空');
    }

    try {
      // 1. 调用微信接口获取openid和session_key
      const wxResponse = await this.getWxOpenid(code);

      // 2. 检查微信返回结果
      if (wxResponse.errcode) {
        this.logger.error(`微信登录失败: ${wxResponse.errmsg}`);
        throw new BadRequestException(`微信登录失败: ${wxResponse.errmsg}`);
      }

      const { openid, unionid } = wxResponse;

      // 3. 根据openid查找或创建用户
      let client = await this.clientRepo.findOne({
        where: { openid },
      });

      if (!client) {
        // 3.1 不存在则创建新用户
        client = this.clientRepo.create({
          openid,
          unionid: unionid || null,
          clientName: userInfo?.nickname || `微信用户${openid.slice(-4)}`,
          clientType: ClientType.PERSONAL,
          clientStage: ClientStage.DEFAULT,
          createdBy: 'system',
        });
      }

      // 4. 更新用户信息（如果提供了）
      if (userInfo) {
        client.nickname = userInfo.nickname;
        client.avatar = userInfo.avatarUrl;
        client.gender = userInfo.gender;
        client.wxCountry = userInfo.country;
        client.wxProvince = userInfo.province;
        client.wxCity = userInfo.city;
        client.language = userInfo.language;
      }

      // 5. 保存用户信息
      await this.clientRepo.save(client);

      // 6. 生成token
      const token = this.jwtService.sign({
        id: client.id,
        openid: client.openid,
        userType: 'wechat_client',
      });

      // 7. 返回登录结果
      return {
        token,
        clientId: client.id,
        openid: client.openid,
        nickname: client.nickname,
        avatar: client.avatar,
        isNewUser: !client.idNo && !client.phone, // 判断是否需要补充信息
      };
    } catch (error) {
      this.logger.error('微信登录过程中发生错误', error.stack);
      throw new BadRequestException('微信登录失败，请稍后重试');
    }
  }

  /**
   * 调用微信接口获取openid和session_key
   * @param code 微信登录code
   */
  private async getWxOpenid(code: string): Promise<any> {
    const url = `https://api.weixin.qq.com/sns/jscode2session`;
    const params = {
      appid: this.WX_APPID,
      secret: this.WX_SECRET,
      js_code: code,
      grant_type: 'authorization_code',
    };

    this.logger.log(`正在请求微信接口，appid: ${this.WX_APPID}, code: ${code}`);
    const response = await axios.get(url, { params });
    return response.data;
  }

  /**
   * 验证身份证号格式
   */
  private validateIdCard(idCard: string): boolean {
    const reg =
      /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/;
    return reg.test(idCard);
  }

  /**
   * 验证手机号格式
   */
  private validatePhone(phone: string): boolean {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(phone);
  }
}
