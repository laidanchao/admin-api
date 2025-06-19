import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { UserStatus } from '@/common/enums';
import { JwtService } from '@nestjs/jwt';
import {pick} from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
    private readonly jwtService:JwtService
  ) {
  }

  /**
   * 登录
   * @param body
   */
  async login(username: string, password: string) {
    const user = await this.userRepo.findOneBy({ username });
    if(!user){
      throw new BadRequestException('用户不存在');
    }

    if(user.status !== UserStatus.NORMAL){
      throw new BadRequestException('用户状态异常');
    }

    if (user.password !== password) {
      throw new BadRequestException('密码有误');
    }

    return this.jwtService.sign(pick(user,['id','username']));
  }
}
