import { Controller } from '@nestjs/common';
import { ClientService } from '@/modules/crm/client/client.service';
import { ClientEntity } from '@/modules/crm/client/client.entity';
import { Crud } from '@dataui/crud';

@Crud({
  model:{
    type: ClientEntity
  }
})
@Controller('/api/client')
export class ClientController {
  constructor(private readonly service: ClientService) {}
}
