import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedService } from '@/modules/service/out/feed/feed.service';
import { FeedDetailEntity } from '@/modules/service/out/feed/feed-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity, FeedDetailEntity])],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {}
