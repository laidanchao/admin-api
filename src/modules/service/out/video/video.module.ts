import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from '@/modules/service/out/video/entity/video.entity';
import { VideoCategory } from '@/modules/service/out/video/entity/video-category.entity';
import { VideoHistoryEntity } from '@/modules/service/out/video/entity/video-history.entity';
import { VideoService } from '@/modules/service/out/video/video.service';
import { VideoCategoryService } from '@/modules/service/out/video/video-category.service';
import { VideoHistoryService } from '@/modules/service/out/video/video-history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoEntity, VideoCategory, VideoHistoryEntity]),
  ],
  providers: [VideoService, VideoCategoryService, VideoHistoryService],
  exports: [VideoService, VideoCategoryService, VideoHistoryService],
})
export class VideoModule {}
