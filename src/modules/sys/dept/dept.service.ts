import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';

@Injectable()
export class DeptService extends TypeOrmCrudService<DeptEntity> {
  constructor(
    @InjectRepository(DeptEntity)
    public readonly repo: Repository<DeptEntity>,
  ) {
    super(repo);
  }

}
