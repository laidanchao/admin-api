import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/sys/user/user.module';
import { RoleModule } from '@/modules/sys/role/role.module';
import { MenuModule } from '@/modules/sys/menu/menu.module';
import { DeptModule } from '@/modules/sys/dept/dept.module';

@Module({
  imports: [UserModule, RoleModule, MenuModule, DeptModule],
})
export class SystemModule {
}
