import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { DictItemEntity } from '@/modules/service/sys/dict/dict-item.entity';
import { DictItemService } from '@/modules/service/sys/dict/dict-item.service';

@Crud({
  model: {
    type: DictItemEntity,
  },
  query: {
    sort: [{ field: 'id', order: 'DESC' }],
  },
})
@Controller('sys/dict-item')
export class DictItemController {
  constructor(private readonly service: DictItemService) {
  }

  @Get('options/:dictCode')
  async options(@Param('dictCode') dictCode: string) {
    return await this.service.getOptions(dictCode);
  }
}
