import { CompleteEntity } from '@/common/basic.entity';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';
import { ClientType } from '@/common/enums';
import { UserEntity } from '@/modules/service/sys/user/user.entity';

@Entity({ name: 'crm_client' })
export class ClientEntity extends CompleteEntity {
  @Column({ unique: true, length: 50 })
  clientName: string;

  @Column({ nullable: true, length: 50 })
  username: string;

  @Column({ nullable: true, length: 50 })
  password: string;

  @Column({ length: 20, type: 'varchar', enum: ClientType })
  clientType: ClientType;

  @Column({ nullable: true, length: 20 })
  phone: string;

  @Column({ nullable: true, length: 20 })
  qq: string;

  @Column({ nullable: true, length: 50 })
  email: string;

  @Column({ nullable: true, length: 255 })
  address: string;

  @Column({ nullable: true })
  salerId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'saler_id', referencedColumnName: 'id' })
  saler: Relation<UserEntity>;
}