import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptService } from '@/modules/sys/dept/dept.service';
import { DeptController } from '@/modules/sys/dept/dept.controller';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeptEntity])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {
}