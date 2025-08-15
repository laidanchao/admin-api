import { CompleteEntity } from '@/common/basic.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Relation } from 'typeorm';
import { ClientStage, ClientType } from '@/common/enums';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { OrderEntity } from '@/modules/service/oms/order/order.entity';

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

  @Column({ length: 20, type: 'varchar', enum: ClientStage })
  clientStage: ClientStage;

  @Column({ unique: true, nullable: true, length: 20 })
  phone: string;

  @Column({ nullable: true, length: 20 })
  qq: string;

  @Column({ nullable: true, length: 50 })
  email: string;

  @Column({ nullable: true, length: 255 })
  address: string;

  @Column({ nullable: true })
  salerId: number;

  @ManyToOne(() => UserEntity, user => user.clients)
  @JoinColumn({ name: 'saler_id' })
  saler: Relation<UserEntity>;

  @OneToMany(() => OrderEntity, order => order.client)
  orders: Relation<OrderEntity[]>;
}