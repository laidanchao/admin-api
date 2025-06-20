import { Injectable } from '@nestjs/common';
import { ClientEntity } from '@/modules/crm/client/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '@/common/base-crud.service';

@Injectable()
export class ClientService extends BaseCrudService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    public readonly repo: Repository<ClientEntity>,
  ) {
    super(repo);
  }

}
