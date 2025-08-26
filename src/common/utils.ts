import { FrontTreeDto } from '@/common/common.dto';
import { isEmpty } from 'lodash';

class Utils {
  getEnv<T>(key: string, defaultValue: T = undefined) {
    const value = process.env[key];
    if (isEmpty(value)) {
      return defaultValue;
    }

    let result;
    switch (typeof T) {
      case 'boolean':
        result = value.toLowerCase() === 'true';
        break;
      case 'number':
        result = Number(value);
        break;
      case 'string':
        result = value.toString();
        break;
      default:
        result = value.toString();
        break;
    }
    return result;
  }

  /**
   * 转成前端需要的树
   * @param items
   */
  convertToFrontTreeDto(items: any[]): FrontTreeDto[] {
    return items.map((item) => ({
      value: item.id, // 将id转换为字符串
      label: item.name,
      children:
        item.children && item.children.length > 0
          ? this.convertToFrontTreeDto(item.children)
          : [],
    }));
  }
}

export default new Utils();
