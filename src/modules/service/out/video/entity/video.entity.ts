import { Entity, Column, OneToMany, ManyToOne, Relation } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';
import { VideoCategory } from '@/modules/service/out/video/entity/video-category.entity';
import { VideoHistoryEntity } from '@/modules/service/out/video/entity/video-history.entity';

@Entity('video')
export class VideoEntity extends CompleteEntity {
  @Column({ type: 'varchar', length: 255, comment: '视频标题' })
  title: string;

  @Column({ type: 'text', nullable: true, comment: '视频描述' })
  description: string;

  @Column({ type: 'varchar', comment: '视频URL' })
  videoUrl: string;

  @Column({ type: 'bigint', default: 0, comment: '视频容量大小（字节）' })
  size: number;

  @Column({ type: 'int', default: 0, comment: '视频总时长（秒）' })
  duration: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '视频封面图URL',
  })
  coverUrl: string;

  @Column({ type: 'int', default: 0, comment: '观看次数' })
  viewCount: number;

  @Column({ type: 'int', nullable: true, comment: '分类ID' })
  categoryId: number;

  @OneToMany(() => VideoHistoryEntity, (history) => history.video)
  histories: Relation<VideoHistoryEntity[]>;

  // 关联到分类表，多个视频可以属于一个分类
  @ManyToOne(() => VideoCategory, (category) => category.videos)
  category: Relation<VideoCategory>;
}
