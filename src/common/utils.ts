import { TreeDto } from '@/common/common.dto';

class Utils {

  convertToTreeDto(items: any[]): TreeDto[] {
    return items.map(item => ({
      value: item.id, // 将id转换为字符串
      label: item.name,
      children: item.children && item.children.length > 0
        ? this.convertToTreeDto(item.children)
        : [],
    }));
  }

}

export default new Utils();