import { CompleteEntity } from '@/common/basic.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { FeedAuditStatus } from '@/common/enums';
import { FeedDetailEntity } from '@/modules/service/out/feed/feed-detail.entity';

@Entity({ name: 'out_feed' })
export class FeedEntity extends CompleteEntity {
  @Column({ nullable: true })
  clientId: number;

  @Column({ length: 50 })
  realName: string;

  @Column({ nullable: true, length: 50 })
  idNo: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ nullable: true, length: 50 })
  city: string;

  @Column({ nullable: true, length: 50 })
  serviceArea: string;

  @Column({ nullable: true, length: 50 })
  direction: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ length: 20, type: 'varchar', enum: FeedAuditStatus })
  auditStatus: FeedAuditStatus;

  @Column({ nullable: true, type: 'timestamp' })
  visitedAt: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  selfImgKey: string;

  @Column({ nullable: true })
  selfImgUrl: string;

  @OneToMany(() => FeedDetailEntity, (detail) => detail.feed)
  details: Relation<FeedDetailEntity[]>;
}
