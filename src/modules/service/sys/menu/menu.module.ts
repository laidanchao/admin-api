import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '@/modules/service/sys/menu/menu.entity';
import { MenuService } from '@/modules/service/sys/menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {
}