import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictService } from '@/modules/sys/dict/dict.service';
import { DictController } from '@/modules/sys/dict/dict.controller';
import { DictEntity } from '@/modules/sys/dict/dict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity])],
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService]
})
export class DictModule {
}