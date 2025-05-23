import { Module } from '@nestjs/common';
import { ClientController } from '@/modules/crm/client/client.controller';
import { ClientService } from '@/modules/crm/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@/modules/crm/client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]),],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
