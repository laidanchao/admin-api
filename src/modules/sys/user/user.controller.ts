import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { UserService } from '@/modules/sys/user/user.service';
import { UserEntity } from '@/modules/sys/user/user.entity';

@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('/api/sys/user')
export class UserController {
  constructor(private readonly service: UserService) {
  }

  /**
   * 获取用户所有菜单的树
   * @param id
   */
  @Get('getMenuTree/:id')
  async getMenuTree(@Param('id') id: number) {
    return await this.service.getMenuTree(id);
  }

}
