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
  routes:{
    only:['getManyBase','getOneBase']
  },
  query: {
    join: {
      dept: {
        eager: true,
      },
    },
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
    return await this.service.findOne({
      where: {
        id: user.userId,
      },
      relations: ['roles'],
    });
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
   */
  @Post('createUser')
  async createUser(@Body() body: CreateUserDto) {
    return await this.service.createUser(body);
  }

  /**
   * 更新用户
   * @param id
   * @param body
   */
  @Post('updateUser/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.service.updateUser(id, body);
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
  async resetPassword(@Param('id') id: number, @Body() body: { password: string }) {
    return await this.service.resetPassword(id, body.password);
  }

  /**
   * 删除用户
   * @param id
   * @param ids
   */
  @Post('deleteByIds')
  async deleteByIds(@Param('id') id: number, @Body() ids:number[]) {
    return await this.service.repo.delete(ids);
  }

}
