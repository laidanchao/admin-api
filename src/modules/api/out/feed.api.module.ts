import { Module } from '@nestjs/common';
import { FeedController } from '@/modules/api/out/feed.controller';
import { FeedModule } from '@/modules/service/out/feed/feed.module';

@Module({
  imports: [FeedModule],
  controllers: [FeedController],
})
export class FeedApiModule {}
