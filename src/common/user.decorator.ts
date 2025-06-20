import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      userId: request.user?.id || 0,
      username: request.user?.username || ''
    };
  }
);

export class UserDto {
  userId:number;
  username:string;
}