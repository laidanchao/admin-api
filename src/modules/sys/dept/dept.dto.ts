

export class DeptTreeDto{
  // 部门id
  value: string;
  // 部门名称
  label: string;
  // 子部门
  children?: DeptTreeDto[]
}