import { Module } from '@nestjs/common';
import { FileController } from '@/modules/api/file/file.controller';
import { FileModule } from '@/modules/service/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [FileController],
})
export class FileApiModuleModule {
}