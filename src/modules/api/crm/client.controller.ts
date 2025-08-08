import { Controller } from '@nestjs/common';
import { ClientService } from '@/modules/service/crm/client/client.service';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';
import { Crud } from '@dataui/crud';
import { CrudAcl } from '@/common/crud-acl.decorator';

@Crud({
  model: {
    type: ClientEntity,
  },
  query: {
    join: {
      saler: {
        eager: true,
      },
    },
    sort: [{ field: 'id', order: 'DESC' }],
  },
})
@CrudAcl('salerId')
@Controller('crm/client')
export class ClientController {
  constructor(private readonly service: ClientService) {
  }
}
