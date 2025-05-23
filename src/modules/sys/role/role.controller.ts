import { Controller } from '@nestjs/common';
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
}
