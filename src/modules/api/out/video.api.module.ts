import { Module } from '@nestjs/common';
import { VideoCategoryController } from '@/modules/api/out/video-category.controller';
import { VideoHistoryController } from '@/modules/api/out/video-history.controller';
import { VideoModule } from '@/modules/service/out/video/video.module';
import { VideoController } from '@/modules/api/out/video.controller';

@Module({
  imports: [VideoModule],
  controllers: [
    VideoController,
    VideoCategoryController,
    VideoHistoryController,
  ],
})
export class VideoApiModule {}
