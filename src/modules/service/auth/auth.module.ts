import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/jwt-auth.guard';
import { AuthService } from '@/modules/service/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import Utils from '@/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: Utils.getEnv<string>('JWT_KEY'),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {
}