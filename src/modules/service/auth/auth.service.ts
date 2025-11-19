import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
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

  // access_token缓存
  private accessTokenCache = {
    token: '',
    expiresAt: 0,
  };

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
   * @param loginCode 微信小程序登录获取的code
   * @param userInfo 微信用户信息（可选）
   */
  async wxLogin(
    loginCode: string,
    phoneCode: string,
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
    if (!loginCode) {
      throw new BadRequestException('登录凭证不能为空');
    }

    this.logger.log('开始处理微信小程序登录请求');
    try {
      // 1. 调用微信接口获取openid和session_key
      const wxResponse = await this.getWxOpenid(loginCode);

      // 2. 检查微信返回结果
      if (wxResponse.errcode) {
        this.logger.error(`微信登录失败: ${wxResponse.errmsg}`, {
          errcode: wxResponse.errcode,
          errmsg: wxResponse.errmsg,
        });
        throw new BadRequestException(`微信登录失败: ${wxResponse.errmsg}`);
      }

      const { openid, unionid } = wxResponse;
      this.logger.log(`获取到微信用户openid: ${openid.slice(0, 6)}...`);

      // 3. 根据openid查找或创建用户
      let client = await this.clientRepo.findOne({
        where: { openid },
      });

      if (!client) {
        // 3.1 不存在则创建新用户
        this.logger.log(`创建新的微信用户，openid: ${openid.slice(0, 6)}...`);
        client = this.clientRepo.create({
          openid,
          unionid: unionid || null,
          clientName: userInfo?.nickname || `微信用户${openid.slice(-4)}`,
          clientType: ClientType.PERSONAL,
          clientStage: ClientStage.DEFAULT,
          avatar:
            'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
          createdBy: 'system',
        });
      } else {
        this.logger.log(`微信用户已存在，clientId: ${client.id}`);
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

      await this.getWxPhoneNumber(client.id, phoneCode);

      // 6. 生成token
      const token = this.jwtService.sign({
        id: client.id,
        openid: client.openid,
        userType: 'wechat_client',
      });

      // 7. 返回登录结果
      return {
        token,
        phone: client.phone,
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
   * 获取微信用户手机号
   * @param clientId 客户ID
   * @param code 获取手机号的code
   */
  async getWxPhoneNumber(clientId: number, code: string) {
    if (!clientId || !code) {
      throw new BadRequestException('客户ID和手机号code不能为空');
    }

    this.logger.log(`开始处理微信获取手机号请求，clientId: ${clientId}`);
    try {
      // 1. 查找客户信息
      const client = await this.clientRepo.findOne({
        where: { id: clientId },
      });

      if (!client) {
        throw new BadRequestException('客户不存在');
      }

      // 2. 调用微信接口获取手机号
      const phoneResponse = await this.decryptWxPhoneNumber(code);

      // 3. 检查微信返回结果
      if (phoneResponse.errcode) {
        this.logger.error(`获取微信手机号失败: ${phoneResponse.errmsg}`);
        throw new BadRequestException(
          `获取微信手机号失败: ${phoneResponse.errmsg}`,
        );
      }

      // 4. 提取手机号
      const phoneNumber = phoneResponse.phone_info?.phoneNumber;

      if (!phoneNumber) {
        throw new BadRequestException('未能获取到手机号');
      }

      // 5. 验证手机号格式
      if (!this.validatePhone(phoneNumber)) {
        throw new BadRequestException('获取到的手机号格式不正确');
      }

      // 6. 检查手机号是否已被其他用户使用
      const existingClient = await this.clientRepo.findOne({
        where: { phone: phoneNumber, id: Not(clientId) },
      });

      if (existingClient) {
        throw new BadRequestException('该手机号已被其他用户使用');
      }

      // 7. 更新客户手机号
      client.phone = phoneNumber;
      client.updatedBy = 'system';
      await this.clientRepo.save(client);

      // 8. 返回更新结果
      return {
        success: true,
        phone: phoneNumber,
        message: '手机号绑定成功',
      };
    } catch (error) {
      this.logger.error('获取微信手机号过程中发生错误', error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('获取手机号失败，请稍后重试');
    }
  }

  /**
   * 调用微信接口获取手机号信息
   * @param code 获取手机号的code
   */
  private async decryptWxPhoneNumber(code: string): Promise<any> {
    const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber`;

    // 获取access_token
    const accessToken = await this.getWxAccessToken();

    const params = {
      code: code,
    };

    this.logger.log(`正在请求微信手机号接口，code: ${code}`);
    try {
      const response = await axios.post(url, params, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          access_token: accessToken,
        },
      });

      this.logger.log('微信手机号接口返回结果', {
        hasPhoneInfo: !!response.data.phone_info,
        errcode: response.data.errcode,
      });

      return response.data;
    } catch (error) {
      this.logger.error('调用微信手机号接口时发生错误', {
        code: code.substring(0, 6) + '...' + code.substring(code.length - 6), // 部分隐藏敏感信息
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }

  /**
   * 获取微信小程序access_token（带缓存）
   */
  private async getWxAccessToken(): Promise<string> {
    // 检查缓存是否有效
    const now = Date.now();
    if (this.accessTokenCache.token && this.accessTokenCache.expiresAt > now) {
      this.logger.log('使用缓存的微信access_token');
      return this.accessTokenCache.token;
    }

    const url = `https://api.weixin.qq.com/cgi-bin/token`;
    const params = {
      grant_type: 'client_credential',
      appid: this.WX_APPID,
      secret: this.WX_SECRET,
    };

    this.logger.log(`正在获取微信access_token，appid: ${this.WX_APPID}`);
    try {
      const response = await axios.get(url, { params });

      if (response.data.errcode) {
        this.logger.error(`获取access_token失败: ${response.data.errmsg}`, {
          errcode: response.data.errcode,
          errmsg: response.data.errmsg,
        });
        throw new Error(`获取access_token失败: ${response.data.errmsg}`);
      }

      // 缓存access_token，过期时间设置为7200秒减去60秒的安全时间
      const expiresIn = response.data.expires_in || 7200;
      this.accessTokenCache = {
        token: response.data.access_token,
        expiresAt: now + (expiresIn - 60) * 1000,
      };

      this.logger.log(
        `成功获取微信access_token，过期时间: ${new Date(this.accessTokenCache.expiresAt).toISOString()}`,
      );
      return response.data.access_token;
    } catch (error) {
      this.logger.error('调用微信接口获取access_token时发生错误', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
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
