import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedDto } from '@/modules/service/out/feed/feed.dto';
import { FeedAuditStatus } from '@/common/enums';
import { FeedDetailEntity } from '@/modules/service/out/feed/feed-detail.entity';

@Injectable()
export class FeedService extends BaseCrudService<FeedEntity> {
  constructor(
    @InjectRepository(FeedEntity)
    public readonly repo: Repository<FeedEntity>,
    @InjectRepository(FeedDetailEntity)
    public readonly detailRepo: Repository<FeedDetailEntity>,
  ) {
    super(repo);
  }

  async save(body: FeedDto) {
    const feed = await this.repo.save({
      idNo: body.idNo,
      phone: body.phone,
      realName: body.realName,
      city: body.city,
      serviceArea: body.serviceArea,
      direction: body.direction,
      comment: body.comment,
      auditStatus: FeedAuditStatus.WAITING,
      createdBy: 'ldc',
    });

    const details = body.details.map((m) => {
      return FeedDetailEntity.create({
        feedId: feed.id,
        areaCode: m.areaCode,
        areaName: m.areaName,
        locationCode: m.locationCode,
        locationName: m.locationName,
        imgKey: m.imgKey,
        coverImgKey: m.coverImgKey,
        isVideo: m.isVideo,
      });
    });

    return await this.detailRepo.save(details);
  }
}
