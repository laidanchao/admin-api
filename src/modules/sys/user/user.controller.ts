import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { UserService } from '@/modules/sys/user/user.service';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { User, UserDto } from '@/common/user.decorator';
import { CreateUserDto, UpdateUserDto } from '@/modules/sys/user/user.dto';
import { MenuTreeNode } from '@/modules/sys/menu/menu.dto';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';

@Crud({
  model: {
    type: UserEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    join: {
      dept: {
        eager: true,
      },
    },
    filter: [
      { field: 'userNo', operator: 'ne', value: '000' },
    ],
  },
})
@Controller('/api/sys/user')
export class UserController {
  constructor(private readonly service: UserService) {
  }

  /**
   * 获取当前用户信息
   * @param user
   */
  @Get('me')
  async me(@User() user: UserDto) {
    return await this.service.me(user.userId);
  }

  /**
   * 获取指定用户信息
   * @param id
   */
  @Get('info/:id')
  async info(@Param('id') id: number) {
    return await this.service.getUserInfo(id);
  }

  /**
   * 获取当前用户拥有的菜单
   * @param user
   */
  @Get('getMenus')
  async getMenus(@User() user: UserDto): Promise<MenuEntity[]> {
    return await this.service.getMenusByUserId(user.userId);
  }

  /**
   * 获取用户所有菜单的树
   * @param user
   */
  @Get('getMenuTree')
  async getMenuTree(@User() user: UserDto): Promise<MenuTreeNode[]> {
    return await this.service.getMenuTree(user.userId);
  }

  /**
   * 创建用户
   * @param body
   * @param user
   */
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto, @User() user: UserDto) {
    return await this.service.createUser(body, user);
  }

  /**
   * 更新用户
   * @param id
   * @param body
   * @param user
   */
  @Post('updateUser/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto, @User() user: UserDto) {
    return await this.service.updateUser(id, body, user);
  }

  /**
   * 获取工号
   */
  @Get('getUserNo')
  async getUserNo() {
    return await this.service.getUserNo();
  }

  /**
   * 重置用户密码
   * @param id
   * @param body
   */
  @Post('resetPassword/:id')
  async resetPassword(@Param('id') id: number, @Body() body: { password: string }, @User() user: UserDto) {
    return await this.service.resetPassword(id, body.password, user);
  }

  /**
   * 删除用户
   * @param id
   * @param ids
   */
  @Post('deleteByIds')
  async deleteByIds(@Param('id') id: number, @Body() ids: number[]) {
    return await this.service.repo.delete(ids);
  }

  /**
   * 修改用户密码
   * @param body
   * @param user
   */
  @Post('changePassword')
  async changePassword(@Body() body: { oldPassword: string, newPassword: string, confirmPassword: string }, @User() user: UserDto) {
    return await this.service.changePassword(user.userId, body);
  }


  /**
   * 修改头像
   * @param body
   * @param user
   */
  @Post('updateAvatar')
  async updateAvatar(@Body() body: { avatar: string }, @User() user: UserDto) {
    return await this.service.updateAvatar(user.userId, body.avatar);
  }
}
