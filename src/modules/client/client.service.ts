import { Injectable } from '@nestjs/common';
import { ClientEntity } from '@/modules/client/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class ClientService extends TypeOrmCrudService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    public readonly repo: Repository<ClientEntity>,
  ) {
    super(repo);
  }

}
