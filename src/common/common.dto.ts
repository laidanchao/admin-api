export class OptionDto {
  value: number;
  label: string;
}

export class TreeDto{
  // id
  value: string | number;
  // 名称
  label: string;
  // 子部门
  children?: TreeDto[]
}