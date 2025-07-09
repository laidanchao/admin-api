import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { RoleController } from '@/modules/sys/role/role.controller';
import { RoleService } from '@/modules/sys/role/role.service';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity,MenuEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {
}