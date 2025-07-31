import { Controller } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { DictService } from '@/modules/service/sys/dict/dict.service';
import { DictEntity } from '@/modules/service/sys/dict/dict.entity';

@Crud({
  model: {
    type: DictEntity,
  },
})
@Controller('sys/dict')
export class DictController {
  constructor(private readonly service: DictService) {
  }
}
