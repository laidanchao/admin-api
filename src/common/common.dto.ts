export class OptionDto {
  value: number;
  label: string;
}

/**
 * 前端需要的树结构
 */
export class FrontTreeDto {
  // id
  value: string | number;
  // 名称
  label: string;
  // 子集
  children?: FrontTreeDto[];
}
