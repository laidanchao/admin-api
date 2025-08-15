import { CompleteEntity } from '@/common/basic.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { OrderPayStatus, OrderStatus, OrderType } from '@/common/enums';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';

@Entity({ name: 'oms_order' })
export class OrderEntity extends CompleteEntity {
  @Column({ unique: true, length: 50, comment: '订单号' })
  orderNo: string;

  @Column({
    type: 'varchar',
    enum: OrderType,
    comment: '订单类型',
  })
  orderType: OrderType;

  @Column({ comment: '客户id' })
  clientId: number;

  @Column({ comment: '归属销售员id' })
  salerId: number;

  @Column({
    type: 'varchar',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
    comment: '订单状态',
  })
  status: OrderStatus;

  @Column({
    type: 'varchar',
    enum: OrderPayStatus,
    default: OrderPayStatus.NOT_PAID,
    comment: '订单支付状态',
  })
  payStatus: OrderPayStatus;

  @Column({ nullable: true, comment: '最后一次支付时间' })
  lastPaidAt: Date;

  @ManyToOne(() => ClientEntity, client => client.orders)
  @JoinColumn({ name: 'client_id' })
  client: Relation<ClientEntity>;

  @ManyToOne(() => UserEntity, user => user.orders)
  @JoinColumn({ name: 'saler_id' })
  saler: Relation<UserEntity>;
}