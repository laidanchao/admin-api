import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { RoleController } from '@/modules/sys/role/role.controller';
import { RoleService } from '@/modules/sys/role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {
}