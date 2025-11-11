import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/service/auth/auth.service';
import { Public } from '@/common/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * 登录
   * @param body
   */
  @Public()
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return await this.service.login(body.username, body.password);
  }

  /**
   * Client登录注册
   * 当输入的身份证号不存在系统时，认定为新增用户（注册）
   * 否则认定为登录，返回token
   * 登录校验规则：身份证号和手机号需匹配
   */
  @Public()
  @Post('client-login')
  async clientLoginRegister(@Body() body: { realName: string; idNo: string; phone: string }) {
    return await this.service.clientLoginRegister(
      body.realName,
      body.idNo,
      body.phone
    );
  }
}
