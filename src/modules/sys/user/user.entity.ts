import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { UserStatus } from '@/common/enums';

@Entity({ name: 'sys_user' })
export class UserEntity extends CompleteEntity {  @Column({ unique: true })
username: string;

  @Exclude()
  @Column()
  password: string;


  @Column({ unique: true })
  userNo: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  qq: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, default: UserStatus.NORMAL })
  status: UserStatus;

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
