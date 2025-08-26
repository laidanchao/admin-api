import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateRoleDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
