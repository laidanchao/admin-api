import { Module } from '@nestjs/common';
import { ClientController } from '@/modules/api/crm/client.controller';
import { CrmModule } from '@/modules/service/crm/crm.module';

@Module({
  imports: [CrmModule],
  controllers: [ClientController],
})
export class CrmApiModuleModule {
}