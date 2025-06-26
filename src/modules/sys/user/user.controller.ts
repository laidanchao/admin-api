import { Controller, Get, Query } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { UserService } from '@/modules/sys/user/user.service';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { User, UserDto } from '@/common/user.decorator';

@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    join: {
      dept: {
        eager: true
      },
    },
  },
})
@Controller('/api/sys/user')
export class UserController {
  constructor(private readonly service: UserService) {
  }

  @Get('me')
  async me(@User() user: UserDto) {
    return await this.service.findOne({
      where: {
        id: user.userId,
      },
      relations: ['roles'],
    });
  }

  @Get('getMenus')
  async getMenus(@User() user: UserDto) {
    return await this.service.getMenusByUserId(user.userId);
  }

  /**
   * 获取用户所有菜单的树
   * @param id
   */
  @Get('getMenuTree')
  async getMenuTree(@User() user: UserDto) {
    return await this.service.getMenuTree(user.userId);
  }

}
