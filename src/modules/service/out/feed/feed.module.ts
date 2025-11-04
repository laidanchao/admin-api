import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedService } from '@/modules/service/out/feed/feed.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {}
