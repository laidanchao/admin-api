import { Module } from '@nestjs/common';
import { FileController } from '@/modules/file/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from '@/modules/file/file.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    })],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {
}
