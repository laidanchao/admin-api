import { Module } from '@nestjs/common';
import { ClientModule } from '@/modules/service/crm/client/client.module';

@Module({
  imports: [ClientModule],
  exports: [ClientModule],
})
export class CrmModule {}
