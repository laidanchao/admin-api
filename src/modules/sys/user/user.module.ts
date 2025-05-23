import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/modules/sys/user/user.service';
import { UserController } from '@/modules/sys/user/user.controller';
import { UserEntity } from '@/modules/sys/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
