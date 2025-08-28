import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictService } from '@/modules/service/sys/dict/dict.service';
import { DictEntity } from '@/modules/service/sys/dict/dict.entity';
import { DictItemService } from '@/modules/service/sys/dict/dict-item.service';
import { DictItemEntity } from '@/modules/service/sys/dict/dict-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity, DictItemEntity])],
  providers: [DictService, DictItemService],
  exports: [DictService, DictItemService],
})
export class DictModule {}
