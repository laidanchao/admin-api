import { Controller } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { DictService } from '@/modules/sys/dict/dict.service';
import { DictEntity } from '@/modules/sys/dict/dict.entity';

@Crud({
  model: {
    type: DictEntity,
  },
})
@Controller('api/sys/dict')
export class DictController {
  constructor(private readonly service: DictService) {
  }
}
