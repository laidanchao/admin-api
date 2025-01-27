import { Module } from '@nestjs/common';
import { ClientController } from '@/modules/client/client.controller';
import { ClientService } from '@/modules/client/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '@/modules/client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]),],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
