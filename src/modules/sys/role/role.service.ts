import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@/modules/sys/role/role.entity';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    public readonly repo: Repository<RoleEntity>,
  ) {
    super(repo);
  }

}
