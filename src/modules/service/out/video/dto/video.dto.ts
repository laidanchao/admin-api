import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { VideoEntity } from '@/modules/service/out/video/entity/video.entity';

/**
 * 视频创建请求DTO
 */
export class CreateVideoDto {
  @IsNotEmpty({ message: '视频标题不能为空' })
  @MaxLength(255, { message: '视频标题长度不能超过255个字符' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: '视频URL不能为空' })
  @IsUrl({}, { message: '视频URL格式不正确' })
  videoUrl: string;

  @IsOptional()
  @IsNumber({}, { message: '视频容量大小必须是数字' })
  size?: number;

  @IsOptional()
  @IsNumber({}, { message: '视频时长必须是数字' })
  duration?: number;

  @IsOptional()
  @IsUrl({}, { message: '封面图URL格式不正确' })
  coverUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: '分类ID必须是数字' })
  categoryId?: number;
}

/**
 * 视频更新请求DTO
 */
export class UpdateVideoDto {

  @IsOptional()
  @MaxLength(255, { message: '视频标题长度不能超过255个字符' })
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: '视频URL格式不正确' })
  videoUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: '视频容量大小必须是数字' })
  size?: number;

  @IsOptional()
  @IsNumber({}, { message: '视频时长必须是数字' })
  duration?: number;

  @IsOptional()
  @IsUrl({}, { message: '封面图URL格式不正确' })
  coverUrl?: string;

  @IsOptional()
  @IsNumber({}, { message: '分类ID必须是数字' })
  categoryId?: number;
}

/**
 * 视频响应DTO
 */
export class VideoResponseDto {
  id: number;

  title: string;

  description?: string;

  videoUrl: string;

  size: number;

  duration: number;

  categoryId?: number;

  category?: {
    id: number;
    name: string;
  };

  coverUrl?: string;

  viewCount: number;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy?: string;

  /**
   * 从实体转换为DTO
   */
  static fromEntity(entity: VideoEntity): VideoResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      videoUrl: entity.videoUrl,
      size: entity.size,
      duration: entity.duration,
      coverUrl: entity.coverUrl,
      viewCount: entity.viewCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      categoryId: entity.categoryId,
      category: entity.category
        ? {
            id: entity.category.id,
            name: entity.category.name,
          }
        : undefined,
    };
  }
}

/**
 * 视频列表响应DTO
 */
export class VideoListResponseDto {
  items: VideoResponseDto[];

  total: number;
}

/**
 * 视频查询参数DTO
 */
export class VideoQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber({}, { message: '分类ID必须是数字' })
  categoryId?: number;

  @IsOptional()
  @IsNumber({}, { message: '页码必须是数字' })
  page?: number;

  @IsOptional()
  @IsNumber({}, { message: '每页数量必须是数字' })
  pageSize?: number;
}
