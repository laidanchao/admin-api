import { Module } from '@nestjs/common';
import { SysApiModule } from '@/modules/api/sys/sys.api.module';
import { FileApiModule } from '@/modules/api/file/file.api.module';
import { CrmApiModule } from '@/modules/api/crm/crm.api.module';
import { AuthApiModule } from '@/modules/api/auth/auth.api.module';
import { OmsApiModule } from '@/modules/api/oms/oms.api.module';

@Module({
  imports: [SysApiModule, FileApiModule, CrmApiModule, AuthApiModule, OmsApiModule],
  exports: [SysApiModule, FileApiModule, CrmApiModule, AuthApiModule, OmsApiModule],
})
export class ApiModule {
}