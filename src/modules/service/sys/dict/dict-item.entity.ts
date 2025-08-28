import { Column, Entity } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';
import { DictItemTagType } from '@/common/enums';

@Entity({ name: 'sys_dict_item' })
export class DictItemEntity extends CompleteEntity {
  @Column({ length: 50, comment: '字典编码' })
  dictCode: string;

  @Column({ length: 50, comment: '字典项名称' })
  itemName: string;

  @Column({ unique: true, comment: '字典项编码', length: 50 })
  itemCode: string;

  @Column({ nullable: true, comment: '字典项描述', length: 255 })
  itemDesc: string;

  @Column({
    nullable: true,
    type: 'varchar',
    enum: DictItemTagType,
    comment: '标签类型（前端回显样式）',
  })
  tagType: DictItemTagType;

  @Column({ comment: '是否激活', default: true })
  isActive: boolean;
}
