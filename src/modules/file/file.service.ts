import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Qiniu } from '@/common/qiniu';

@Injectable()
export class FileService {
  /**
   * 上传图片
   * @param file
   * @param filePath
   */
  async uploadImage(file: Express.Multer.File, filePath: string) {
    if (!file) {
      throw new Error('请上传文件');
    }

    // 生成唯一的文件名
    const ext = file.originalname.split('.').pop();
    filePath = filePath || 'images';
    const key = `${filePath}/${randomUUID()}.${ext}`;

    // 上传到七牛云
    const url = await new Qiniu().upload(file, key);

    return {
      url,
      key,
      originalname: file.originalname,
      size: file.size,
    };
  }

  /**
   * 删除文件
   * @param key
   */
  async deleteFile(key: string) {
    return await new Qiniu().deleteFile(key);
  }

}
