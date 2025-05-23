import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';

@Injectable()
export class MenuService extends TypeOrmCrudService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    public readonly repo: Repository<MenuEntity>,
  ) {
    super(repo);
  }

}
