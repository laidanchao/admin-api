import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { BaseCrudService } from '@/common/base-crud.service';
import { DictEntity } from '@/modules/sys/dict/dict.entity';

@Injectable()
export class DictService extends BaseCrudService<DictEntity> {
  constructor(
    @InjectRepository(DictEntity)
    public readonly repo: Repository<DictEntity>,
  ) {
    super(repo);
  }

}
