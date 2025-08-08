import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { UserStatus } from '@/common/enums';
import { JwtService } from '@nestjs/jwt';
import { aesEncrypt } from '@/common/crypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {
  }

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
    const roleCodes = user.roles.map(m => m.code);

    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      roles: roleCodes,
    });
  }
}
