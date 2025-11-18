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
@Unique(['openid']) // 确保openid唯一
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

  // 微信小程序相关字段
  @Column({ name: 'openid', length: 100, nullable: true }) // 微信小程序openid
  openid: string;

  @Column({ name: 'unionid', length: 100, nullable: true }) // 微信unionid（可选）
  unionid: string;

  @Column({ name: 'nickname', length: 100, nullable: true }) // 微信昵称
  nickname: string;

  @Column({ name: 'avatar', length: 255, nullable: true }) // 微信头像URL
  avatar: string;

  @Column({ name: 'gender', nullable: true }) // 性别 0:未知 1:男 2:女
  gender: number;

  @Column({ name: 'wx_country', length: 50, nullable: true }) // 国家
  wxCountry: string;

  @Column({ name: 'wx_province', length: 50, nullable: true }) // 省份
  wxProvince: string;

  @Column({ name: 'wx_city', length: 50, nullable: true }) // 城市
  wxCity: string;

  @Column({ name: 'language', length: 20, nullable: true }) // 语言
  language: string;

  @ManyToOne(() => UserEntity, (user) => user.clients)
  @JoinColumn({ name: 'saler_id' })
  saler: Relation<UserEntity>;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: Relation<OrderEntity[]>;
}
