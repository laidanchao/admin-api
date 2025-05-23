import { Module } from '@nestjs/common';
import { ClientModule } from '@/modules/crm/client/client.module';

@Module({
  imports: [ClientModule],
})
export class CrmModule {
}
