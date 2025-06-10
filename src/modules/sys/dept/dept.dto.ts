import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class DeptTreeDto{
  // 部门id
  value: string;
  // 部门名称
  label: string;
  // 子部门
  children?: DeptTreeDto[]
}

export class AddDeptDto{
  @IsString()
  @IsNotEmpty()
  name:string;

  @IsNumber()
  @IsNotEmpty()
  parentId:number;
}

export class UpdateDeptDto{
  @IsString()
  name:string;

  @IsNumber()
  parentId:number;
}