import { Module } from '@nestjs/common';
import { ClientService } from '@/modules/service/crm/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {
}
