import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { VideoEntity } from '@/modules/service/out/video/entity/video.entity';
import { CompleteEntity } from '@/common/basic.entity';

@Entity('video_category')
export class VideoCategory extends CompleteEntity {
  @Column({ length: 50, nullable: false, comment: '分类名称' })
  name: string;

  @Column({ length: 200, nullable: true, comment: '分类描述' })
  description: string;

  @Column({ default: 0, comment: '排序权重' })
  sort: number;

  @Column({ default: true, comment: '是否启用' })
  enabled: boolean;

  // 关联到视频表，一个分类可以有多个视频
  @OneToMany(() => VideoEntity, (video) => video.category)
  videos: Relation<VideoEntity[]>;
}
