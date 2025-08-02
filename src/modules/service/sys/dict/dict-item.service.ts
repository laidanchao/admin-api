import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { DictItemEntity } from '@/modules/service/sys/dict/dict-item.entity';
import { DictItemOptionDto } from '@/modules/service/sys/dict/dict-item.dto';

@Injectable()
export class DictItemService extends BaseCrudService<DictItemEntity> {
  constructor(
    @InjectRepository(DictItemEntity)
    public readonly repo: Repository<DictItemEntity>,
  ) {
    super(repo);
  }

  async getOptions(dictCode: string): Promise<DictItemOptionDto[]> {
    const roles = await this.repo.find({
      where: {
        dictCode,
      },
    });
    return roles.map(m => {
      return {
        value: m.itemCode,
        label: m.itemName,
        tagType: m.tagType,
      };
    });
  }
}
