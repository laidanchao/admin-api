import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { CompleteEntity } from '@/common/basic.entity';
import { MenuType } from '@/common/enums';

@Entity({ name: 'sys_menu' })
export class MenuEntity extends CompleteEntity {
  @Column({ name: 'parent_id', nullable: true })
  parentId?: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true, length: 100, comment: '菜单路径' })
  path: string;

  @Column({ length: 20, type: 'varchar', enum: MenuType })
  type: MenuType;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: 'int', default: 0, comment: '排序，越小越前面' })
  sort: number;

  @Column({ nullable: true, comment: '按钮权限', length: 100 })
  permission: string;

  @ManyToOne(() => MenuEntity, (menu) => menu.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: MenuEntity;

  @OneToMany(() => MenuEntity, (menu) => menu.parent)
  children: MenuEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.menus, {
    onDelete: 'CASCADE',
  })
  roles: Relation<RoleEntity[]>;
}
