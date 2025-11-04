import { Body, Controller, Post } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { FeedService } from '@/modules/service/out/feed/feed.service';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedDto } from '@/modules/service/out/feed/feed.dto';

@Crud({
  model: {
    type: FeedEntity,
  },
  query: {
    join: {},
    sort: [{ field: 'id', order: 'DESC' }],
  },
})
@Controller('out/feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @Post('save')
  save(@Body() body: FeedDto) {
    return this.service.save(body);
  }
}
