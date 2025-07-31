import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictService } from '@/modules/service/sys/dict/dict.service';
import { DictController } from '@/modules/api/sys/dict/dict.controller';
import { DictEntity } from '@/modules/service/sys/dict/dict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity])],
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService]
})
export class DictModule {
}