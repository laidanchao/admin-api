import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/service/sys/role/role.entity';
import { RoleService } from '@/modules/service/sys/role/role.service';
import { MenuEntity } from '@/modules/service/sys/menu/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, MenuEntity])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
