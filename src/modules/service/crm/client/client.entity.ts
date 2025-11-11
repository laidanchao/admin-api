import { CompleteEntity } from '@/common/basic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
  Unique,
} from 'typeorm';
import { ClientStage, ClientType } from '@/common/enums';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { OrderEntity } from '@/modules/service/oms/order/order.entity';

@Entity({ name: 'crm_client' })
@Unique(['idNo']) // 确保身份证号唯一
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

  // 添加真实姓名
  @Column({ name: 'real_name', length: 50, nullable: true })
  realName: string;

  // 添加身份证号
  @Column({ name: 'id_no', length: 18, nullable: true })
  idNo: string;

  @ManyToOne(() => UserEntity, (user) => user.clients)
  @JoinColumn({ name: 'saler_id' })
  saler: Relation<UserEntity>;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: Relation<OrderEntity[]>;
}
