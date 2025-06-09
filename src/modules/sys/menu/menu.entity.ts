import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { CompleteEntity } from '@/common/basic.entity';
import { MenuType } from '@/common/enums';

@Entity({ name: 'sys_menu' })
export class MenuEntity extends CompleteEntity {
  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true, length: 100, comment: '菜单路径' })
  path: string;

  @Column({ length: 20 })
  type: MenuType;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: 'int', default: 0, comment: '排序，越小越前面' })
  sort: number;

  @ManyToMany(() => RoleEntity, role => role.menus, {
    onDelete: 'CASCADE',
  })
  roles: Relation<RoleEntity[]>;
}
