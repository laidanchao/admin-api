import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NestInterceptor,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '@/modules/service/file/file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  /**
   * 上传图片
   * @param file
   * @param body
   */
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('只允许上传图片文件'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }) as NestInterceptor)
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() body: { filePath: string }) {
    return this.fileService.uploadImage(file, body.filePath);
  }

  /**
   * 获取导入客户的模板
   */
  @Get('getClientTemplate')
  async getClientTemplate() {
    return this.fileService.getDownloadUrl('template/客户导入模板.xlsx');
  }

}
