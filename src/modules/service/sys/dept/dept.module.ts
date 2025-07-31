import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptService } from '@/modules/service/sys/dept/dept.service';
import { DeptEntity } from '@/modules/service/sys/dept/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeptEntity])],
  providers: [DeptService],
  exports: [DeptService],
})
export class DeptModule {
}