import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { VideoCategory } from '../entity/video-category.entity';

/**
 * 创建分类请求DTO
 */
export class CreateVideoCategoryDto {
  @IsString({ message: '分类名称必须是字符串' })
  @MaxLength(50, { message: '分类名称长度不能超过50个字符' })
  name: string;

  @IsString({ message: '分类描述必须是字符串' })
  @MaxLength(200, { message: '分类描述长度不能超过200个字符' })
  @IsOptional()
  description?: string;

  @IsInt({ message: '排序权重必须是整数' })
  @Min(0, { message: '排序权重不能小于0' })
  @IsOptional()
  sort?: number;

  @IsBoolean({ message: 'enabled必须是布尔值' })
  @IsOptional()
  enabled?: boolean;
}

/**
 * 更新分类请求DTO
 */
export class UpdateVideoCategoryDto {
  @IsString({ message: '分类名称必须是字符串' })
  @MaxLength(50, { message: '分类名称长度不能超过50个字符' })
  @IsOptional()
  name?: string;

  @IsString({ message: '分类描述必须是字符串' })
  @MaxLength(200, { message: '分类描述长度不能超过200个字符' })
  @IsOptional()
  description?: string;

  @IsInt({ message: '排序权重必须是整数' })
  @Min(0, { message: '排序权重不能小于0' })
  @IsOptional()
  sort?: number;

  @IsBoolean({ message: 'enabled必须是布尔值' })
  @IsOptional()
  enabled?: boolean;
}

/**
 * 分类响应DTO
 */
export class VideoCategoryResponseDto {
  id: number;

  name: string;

  description?: string;

  sort: number;

  enabled: boolean;

  createdAt: Date;

  updatedAt?: Date;

  createdBy: string;

  updatedBy?: string;

  /**
   * 从实体转换为DTO
   */
  static fromEntity(entity: VideoCategory): VideoCategoryResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      sort: entity.sort,
      enabled: entity.enabled,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    };
  }
}

/**
 * 分类列表响应DTO
 */
export class VideoCategoryListResponseDto {
  items: VideoCategoryResponseDto[];

  total: number;
}

/**
 * 分类查询参数DTO
 */
export class VideoCategoryQueryDto {
  @IsBoolean({ message: 'enabled必须是布尔值' })
  @IsOptional()
  enabled?: boolean;

  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码不能小于1' })
  @IsOptional()
  page?: number;

  @IsInt({ message: '每页数量必须是整数' })
  @Min(1, { message: '每页数量不能小于1' })
  @MaxLength(100, { message: '每页数量不能超过100' })
  @IsOptional()
  pageSize?: number;
}
