import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { BaseCrudService } from '@/common/base-crud.service';
import { OptionDto } from '@/common/common.dto';

@Injectable()
export class RoleService extends BaseCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    public readonly repo: Repository<RoleEntity>,
  ) {
    super(repo);
  }

  /**
   * 获取角色下拉数据源
   */
  async getOptions(): Promise<OptionDto[]> {
    const roles = await this.repo.find();
    return roles.map(m => {
      return <OptionDto>{
        value: m.id,
        label: m.name,
      };
    });
  }

}
