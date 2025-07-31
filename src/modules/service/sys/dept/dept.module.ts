import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptService } from '@/modules/service/sys/dept/dept.service';
import { DeptController } from '@/modules/api/sys/dept/dept.controller';
import { DeptEntity } from '@/modules/service/sys/dept/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeptEntity])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {
}