import { Module } from '@nestjs/common';
import { DeptController } from '@/modules/api/sys/dept/dept.controller';
import { DictController } from '@/modules/api/sys/dict/dict.controller';
import { MenuController } from '@/modules/api/sys/menu/menu.controller';
import { RoleController } from '@/modules/api/sys/role/role.controller';
import { UserController } from '@/modules/api/sys/user/user.controller';
import { SysModule } from '@/modules/service/sys/sys.module';
import { DictItemController } from '@/modules/api/sys/dict/dict-item.controller';

@Module({
  imports: [SysModule],
  controllers: [
    DeptController,
    DictController,
    DictItemController,
    MenuController,
    RoleController,
    UserController,
  ],
})
export class SysApiModule {
}