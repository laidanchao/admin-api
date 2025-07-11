import { MenuType } from '@/common/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MenuTreeNode {
  id: number;
  // 父级菜单id
  parentId?: number;
  // 菜单名
  name: string;
  // 菜单路径
  path: string;
  // 菜单类型
  type: MenuType;
  // 图标url
  icon: string;
  // 排序，越小越前面
  sort: number;
  children: MenuTreeNode[];
}

export class AddMenuDto {
  @IsNumber()
  parentId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsEnum(MenuType)
  @IsNotEmpty()
  type: MenuType;

  @IsString()
  @IsOptional()
  icon: string;

  @IsNumber()
  @IsOptional()
  sort: number;
}

export class CreateMenuDto {
  @IsNumber()
  parentId: number;

  @IsString()
  name: string;

  @IsString()
  path: string;

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
  path: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsNumber()
  @IsOptional()
  sort: number;
}