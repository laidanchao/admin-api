import { Controller } from '@nestjs/common';
import { DeptService } from '@/modules/sys/dept/dept.service';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { Crud } from '@dataui/crud';

@Crud({
  model: {
    type: DeptEntity,
  },
})
@Controller('api/sys/dept')
export class DeptController {
  constructor(private readonly service: DeptService) {
  }
}
