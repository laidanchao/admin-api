import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedDto } from '@/modules/service/out/feed/feed.dto';
import { FeedAuditStatus } from '@/common/enums';
import { FeedDetailEntity } from '@/modules/service/out/feed/feed-detail.entity';
// import { FeedDetailEntity } from '@/modules/service/out/feed/feed-detail.entity';

@Injectable()
export class FeedService extends BaseCrudService<FeedEntity> {
  constructor(
    @InjectRepository(FeedEntity)
    public readonly repo: Repository<FeedEntity>,
    // @InjectRepository(FeedDetailEntity)
    // public readonly detailRepo: Repository<FeedDetailEntity>,
  ) {
    super(repo);
  }

  async save(body: FeedDto) {
    const feed = new FeedEntity();
    feed.idNo = body.idNo;
    feed.phone = body.phone;
    feed.realName = body.realName;
    feed.comment = body.comment;
    feed.auditStatus = FeedAuditStatus.WAITING;
    feed.createdBy = 'ldc';
    feed.details = body.details.map((m) => {
      return FeedDetailEntity.create({
        areaCode: m.areaCode,
        areaName: m.areaName,
        locationCode: m.locationCode,
        locationName: m.locationName,
        imgKey: m.imgKey,
        coverImgKey: m.coverImgKey,
        isVideo: m.isVideo,
      });
    });

    return await this.repo.save(feed);
  }
}
