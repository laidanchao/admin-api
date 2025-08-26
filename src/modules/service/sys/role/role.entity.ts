import { Column, Entity, JoinTable, ManyToMany, Relation } from 'typeorm';
import { MenuEntity } from '../menu/menu.entity';
import { CompleteEntity } from '@/common/basic.entity';
import { UserEntity } from '@/modules/service/sys/user/user.entity';

@Entity({ name: 'sys_role' })
export class RoleEntity extends CompleteEntity {
  @Column({ length: 50, unique: true })
  name: string;

  @Column({ unique: true, comment: '角色编号', length: 50 })
  code: string;

  @Column({ nullable: true, comment: '角色描述' })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: Relation<UserEntity[]>;

  @ManyToMany(() => MenuEntity, (menu) => menu.roles)
  @JoinTable({
    name: 'sys_role_menus',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' },
  })
  menus: MenuEntity[];
}
