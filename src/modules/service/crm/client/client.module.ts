import { Module } from '@nestjs/common';
import { ClientController } from '@/modules/api/crm/client.controller';
import { ClientService } from '@/modules/service/crm/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]),],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
