import { Column, Entity, OneToMany, Relation, Tree, TreeChildren, TreeParent } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';
import { UserEntity } from '@/modules/system/user/user.entity';


@Entity({ name: 'sys_dept' })
@Tree('materialized-path')
export class DeptEntity extends CompleteEntity {
  @Column()
  name: string;

  @TreeChildren({ cascade: true })
  children: DeptEntity[];

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: DeptEntity;

  @OneToMany(() => UserEntity, user => user.dept)
  users: Relation<UserEntity[]>;
}
