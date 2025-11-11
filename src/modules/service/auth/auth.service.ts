import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { ClientStage, UserStatus } from '@/common/enums';
import { JwtService } from '@nestjs/jwt';
import { aesEncrypt } from '@/common/crypt';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';

@Injectable()
export class AuthService {
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
      where: { idNo },
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
    return this.jwtService.sign({
      id: client.id,
      realName: client.realName,
      idNo: client.idNo,
      phone: client.phone,
      userType: 'client',
    });
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
