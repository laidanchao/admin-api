import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from '@/modules/service/sys/role/role.service';
import { Crud } from '@dataui/crud';
import { RoleEntity } from '@/modules/service/sys/role/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '@/modules/service/sys/role/role.dto';
import { User, UserDto } from '@/common/user.decorator';

@Crud({
  model: {
    type: RoleEntity,
  },
  dto: {
    update: UpdateRoleDto,
    create: CreateRoleDto,
  },
  query: {
    filter: [
      { field: 'code', operator: 'ne', value: 'ROOT' },
    ],
  },
})
@Controller('sys/role')
export class RoleController {
  constructor(private readonly service: RoleService) {
  }

  /**
   * 获取角色下拉数据源
   */
  @Get('options')
  async options() {
    return await this.service.getOptions();
  }

  /**
   * 获取菜单的id集合
   * @param id
   */
  @Get('getMenuIds/:id')
  async getMenuIds(@Param('id') id: number) {
    return await this.service.getMenuIds(id);
  }

  /**
   * 更新角色的菜单
   * @param id
   */
  @Post('updateRoleMenus/:id')
  async updateRoleMenus(@Param('id') id: number, @Body() menuIds: number[], @User() user: UserDto) {
    return await this.service.updateRoleMenus(id, menuIds, user);
  }

  /**
   * 删除角色
   * @param id
   * @param ids
   */
  @Post('deleteByIds')
  async deleteByIds(@Param('id') id: number, @Body() ids: number[]) {
    return await this.service.repo.delete(ids);
  }
}
