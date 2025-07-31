import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '@/modules/service/sys/menu/menu.entity';
import { MenuController } from '@/modules/api/sys/menu/menu.controller';
import { MenuService } from '@/modules/service/sys/menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {
}