import { UserStatus } from '@/common/enums';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  userNo: string;

  @IsString()
  nickname: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  qq: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  status: UserStatus;

  @IsNumber()
  deptId: number;

  @IsArray()
  roleIds: number[];
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  qq: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  status: UserStatus;

  @IsNumber()
  deptId: number;

  @IsArray()
  roleIds: number[];
}
