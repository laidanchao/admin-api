import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/service/sys/user/user.module';
import { RoleModule } from '@/modules/service/sys/role/role.module';
import { MenuModule } from '@/modules/service/sys/menu/menu.module';
import { DeptModule } from '@/modules/service/sys/dept/dept.module';
import { DictModule } from '@/modules/service/sys/dict/dict.module';

@Module({
  imports: [UserModule, RoleModule, MenuModule, DeptModule, DictModule],
})
export class SysModule {
}
