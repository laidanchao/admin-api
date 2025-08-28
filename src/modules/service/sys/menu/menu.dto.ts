import { MenuType } from '@/common/enums';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class MenuTreeNode {
  id: number;
  // 父级菜单id
  parentId?: number;
  // 菜单名
  name: string;
  // 菜单路径
  path: string;
  // 权限标识
  permission: string;
  // 菜单类型
  type: MenuType;
  // 图标url
  icon: string;
  // 排序，越小越前面
  sort: number;
  children: MenuTreeNode[];
}

export class CreateMenuDto {
  @IsNumber()
  parentId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsString()
  @IsOptional()
  permission: string;

  @IsEnum(MenuType)
  type: MenuType;

  @IsString()
  @IsOptional()
  icon: string;

  @IsNumber()
  @IsOptional()
  sort: number;
}

export class UpdateMenuDto {
  @IsNumber()
  parentId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsString()
  @IsOptional()
  permission: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsNumber()
  @IsOptional()
  sort: number;
}
