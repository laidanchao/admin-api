import { Injectable } from '@nestjs/common';
import { ClientEntity } from '@/modules/client/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repository: Repository<ClientEntity>
  ) {
  }
   getHello(): Promise<ClientEntity[]> {
    return this.repository.find();
  }
}
