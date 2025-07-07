import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from '@/modules/sys/role/role.service';
import { Crud } from '@dataui/crud';
import { RoleEntity } from '@/modules/sys/role/role.entity';

@Crud({
  model: {
    type: RoleEntity,
  },
})
@Controller('api/sys/role')
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
}
