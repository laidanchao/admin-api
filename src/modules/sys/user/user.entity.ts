import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { UserStatus } from '@/common/enums';

@Entity({ name: 'sys_user' })
export class UserEntity extends CompleteEntity {
  @Column({ unique: true, length: 50 })
  username: string;

  @Exclude()
  @Column({ length: 100, select: false })
  password: string;

  @Column({ unique: true, length: 10, comment: '工号' })
  userNo: string;

  @Column({ nullable: true, length: 50 })
  nickname: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ nullable: true, comment: '头像url' })
  avatar: string;

  @Column({ nullable: true, length: 20 })
  qq: string;

  @Column({ nullable: true, length: 50 })
  email: string;

  @Column({ nullable: true, length: 20 })
  phone: string;

  @Column({ nullable: true, default: UserStatus.NORMAL, length: 20, enum: UserStatus, type: 'varchar' })
  status: UserStatus;

  @Column({ nullable: true })
  deptId: number;

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'sys_user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<RoleEntity[]>;

  @ManyToOne(() => DeptEntity, dept => dept.users)
  @JoinColumn({ name: 'dept_id' })
  dept: Relation<DeptEntity>;

}
