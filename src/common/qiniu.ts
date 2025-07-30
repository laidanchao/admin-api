import qiniu from 'qiniu';
import dayjs from 'dayjs';

export class Qiniu {
  private Mac: qiniu.auth.digest.Mac;
  private readonly Bucket = process.env.QINIU_BUCKET;

  constructor() {
    this.Mac = new qiniu.auth.digest.Mac(process.env.QINIU_ACCESS_KEY, process.env.QINIU_SECRET_KEY);
  }

  getToken() {
    const options = {
      scope: this.Bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(this.Mac);
  }

  upload(file: Express.Multer.File, key: string): Promise<string> {
    const token = this.getToken();
    const formUploader = new qiniu.form_up.FormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    return new Promise((resolve, reject) => {
      formUploader.put(
        token,
        key,
        file.buffer,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          }
          if (respInfo.statusCode === 200) {
            const url = this.getPrivateUrl(respBody.key);
            resolve(url);
          } else {
            reject(new Error(`上传失败: ${respInfo.statusCode}`));
          }
        },
      );
    });
  }

  /**
   * 获取永久url
   * @param key
   */
  getPrivateUrl(key: string): string {
    const bucketManager = new qiniu.rs.BucketManager(this.Mac);
    // 过期时间（单位：秒），这里设置为50年，相当于永久
    const deadline = dayjs().add(50, 'year').unix();
    return bucketManager.privateDownloadUrl(process.env.QINIU_DOMAIN, key, deadline);
  }

  /**
   * 删除文件
   * @param key
   */
  deleteFile(key: string): Promise<boolean> {
    const bucketManager = new qiniu.rs.BucketManager(this.Mac);
    return new Promise((resolve, reject) => {
      bucketManager.delete(
        process.env.QINIU_BUCKET,
        key,
        (err, respBody, respInfo) => {
          if (err) {
            console.error('删除失败:', err);
            reject(err);
          } else if (respInfo.statusCode === 200) {
            resolve(true);
          } else {
            reject(new Error(`删除失败: ${respInfo.statusCode}`));
          }
        },
      );
    });
  }
}