import { Body, Controller, Post, Res } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { FeedService } from '@/modules/service/out/feed/feed.service';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedDto } from '@/modules/service/out/feed/feed.dto';
import { FeedAuditStatus } from '@/common/enums';

@Crud({
  model: {
    type: FeedEntity,
  },
  query: {
    join: {
      details: {
        eager: true,
      },
    },
    sort: [{ field: 'id', order: 'DESC' }],
  },
})
@Controller('bigong/feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @Post('save')
  save(@Body() body: FeedDto) {
    return this.service.save(body);
  }

  @Post('export')
  async export(
    @Body()
    body: {
      keywords: string;
      city: string;
      serviceArea: string;
      auditStatus: FeedAuditStatus;
    },
    @Res() res: Response,
  ) {
    const buffer = await this.service.export(body);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="export_${Date.now()}.xlsx"`,
    );

    res.send(buffer);
  }
}
