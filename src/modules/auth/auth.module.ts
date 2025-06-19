import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/common/jwt-auth.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { AuthController } from '@/modules/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {
}