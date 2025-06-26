import { Column, Entity } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';

@Entity({ name: 'sys_dict' })
export class DictEntity extends CompleteEntity {
  @Column({ length: 50, comment: '字典名称' })
  name: string;

  @Column({ unique: true, comment: '字典编码', length: 50 })
  code: string;

  @Column({ comment: '字典类型', length: 50 })
  type: string;

  @Column({ nullable: true, comment: '字典描述', length: 255 })
  description: string;

  @Column({ comment: '是否激活', default: true })
  isActive: boolean;
}
