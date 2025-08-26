import { DictItemTagType } from '@/common/enums';

export class DictItemOptionDto {
  /** 字典项编码 */
  value: string;

  /** 字典项名称 */
  label: string;

  /** 标签类型 */
  tagType: DictItemTagType;
}
