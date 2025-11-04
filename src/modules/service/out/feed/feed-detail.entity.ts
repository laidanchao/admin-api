import { BasicEntity } from '@/common/basic.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';

@Entity({ name: 'out_feed_detail' })
export class FeedDetailEntity extends BasicEntity {
  @Column()
  feedId: number;

  @Column({ nullable: true, length: 50 })
  areaCode: string;

  @Column({ nullable: true, length: 50 })
  areaName: string;

  @Column({ nullable: true, length: 50 })
  locationCode: string;

  @Column({ nullable: true, length: 50 })
  locationName: string;

  @Column({ nullable: true })
  imgKey: string;

  @Column({ nullable: true })
  coverImgKey: string;

  @Column({ nullable: true })
  isVideo: boolean;

  @ManyToOne(() => FeedEntity, (feed) => feed.details)
  @JoinColumn({ name: 'feed_id' })
  feed: Relation<FeedEntity>;
}
