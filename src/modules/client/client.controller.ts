import { Controller, Get } from '@nestjs/common';
import { ClientService } from '@/modules/client/client.service';
import { ClientEntity } from '@/modules/client/client.entity';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getHello(): Promise<ClientEntity[]> {
    return this.clientService.getHello();
  }
}
