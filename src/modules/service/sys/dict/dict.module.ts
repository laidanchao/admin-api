import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictService } from '@/modules/service/sys/dict/dict.service';
import { DictEntity } from '@/modules/service/sys/dict/dict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity])],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule {
}