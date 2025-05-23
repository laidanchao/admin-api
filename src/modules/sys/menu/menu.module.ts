import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { MenuController } from '@/modules/sys/menu/menu.controller';
import { MenuService } from '@/modules/sys/menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {
}