import { Controller } from '@nestjs/common';
import { ClientService } from '@/modules/service/crm/client/client.service';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';
import { Crud } from '@dataui/crud';

@Crud({
  model:{
    type: ClientEntity
  },
  query: {
    sort: [{ field: "id", order: "DESC" }]
  }
})
@Controller('crm/client')
export class ClientController {
  constructor(private readonly service: ClientService) {}
}
