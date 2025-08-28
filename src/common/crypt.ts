import crypto from 'crypto';
import Utils from '@/common/utils';

const aesAlgorithm = 'aes-256-cbc';
const aesKey = Buffer.from(Utils.getEnv<string>('AES_KEY'));
const aesIv = Buffer.from(Utils.getEnv<string>('AES_IV'));

/**
 * aes加密
 * @param 需要加密的文本
 */
const aesEncrypt = (text: string) => {
  const cipher = crypto.createCipheriv(aesAlgorithm, aesKey, aesIv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

/**
 * aes解密
 * @param pwd 密文
 */
const aesDecrypt = (pwd: string) => {
  const decipher = crypto.createDecipheriv(aesAlgorithm, aesKey, aesIv);
  let decrypted = decipher.update(pwd, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export { aesEncrypt, aesDecrypt };
