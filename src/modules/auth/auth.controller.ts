import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/common/public.decorator';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {
  }

  /**
   * 登录
   * @param body
   */
  @Public()
  @Post('login')
  async login(@Body() body: { username: string, password: string }) {
    return await this.service.login(body.username, body.password);
  }
}
