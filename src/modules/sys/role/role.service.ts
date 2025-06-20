import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { BaseCrudService } from '@/common/base-crud.service';

@Injectable()
export class RoleService extends BaseCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    public readonly repo: Repository<RoleEntity>,
  ) {
    super(repo);
  }

}
