import { Entity, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { CompleteEntity } from '@/common/basic.entity';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';
import { VideoEntity } from '@/modules/service/out/video/entity/video.entity';

@Entity('video_history')
export class VideoHistoryEntity extends CompleteEntity {
  @Column({ type: 'int', comment: '客户ID' })
  clientId: number;

  @Column({ type: 'int', comment: '视频ID' })
  videoId: number;

  @Column({ type: 'int', default: 0, comment: '播放进度（秒）' })
  position: number;

  @Column({ type: 'boolean', default: false, comment: '是否已看完' })
  isCompleted: boolean;

  @ManyToOne(() => ClientEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Relation<ClientEntity>;

  @ManyToOne(() => VideoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'video_id' })
  video: Relation<VideoEntity>;
}
