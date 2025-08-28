import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/service/auth/auth.module';
import { AuthController } from '@/modules/api/auth/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
})
export class AuthApiModule {}
