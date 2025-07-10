import { FrontTreeDto } from '@/common/common.dto';

class Utils {

  /**
   * 转成前端需要的树
   * @param items
   */
  convertToFrontTreeDto(items: any[]): FrontTreeDto[] {
    return items.map(item => ({
      value: item.id, // 将id转换为字符串
      label: item.name,
      children: item.children && item.children.length > 0
        ? this.convertToFrontTreeDto(item.children)
        : [],
    }));
  }

}

export default new Utils();