import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VideoHistoryEntity } from '../entity/video-history.entity';
import { VideoResponseDto } from './video.dto';

/**
 * 观看历史创建/更新请求DTO
 */
export class SaveVideoHistoryDto {
  @IsNotEmpty({ message: '客户ID不能为空' })
  @IsNumber({}, { message: '客户ID必须是数字' })
  clientId: number;

  @IsNotEmpty({ message: '视频ID不能为空' })
  @IsNumber({}, { message: '视频ID必须是数字' })
  videoId: number;

  @IsNotEmpty({ message: '播放进度不能为空' })
  @IsNumber({}, { message: '播放进度必须是数字' })
  position: number;

  @IsOptional()
  @IsBoolean({ message: '是否已看完必须是布尔值' })
  isCompleted?: boolean;
}

/**
 * 观看历史响应DTO
 */
export class VideoHistoryResponseDto {
  id: number;

  clientId: number;

  videoId: number;

  position: number;

  isCompleted: boolean;

  @ValidateNested()
  @Type(() => VideoResponseDto)
  video?: VideoResponseDto;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy?: string;

  /**
   * 从实体转换为DTO
   */
  static fromEntity(entity: VideoHistoryEntity): VideoHistoryResponseDto {
    const dto = new VideoHistoryResponseDto();
    dto.id = entity.id;
    dto.clientId = entity.clientId;
    dto.videoId = entity.videoId;
    dto.position = entity.position;
    dto.isCompleted = entity.isCompleted;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.createdBy = entity.createdBy;
    dto.updatedBy = entity.updatedBy;

    // 如果有关联的视频信息，也进行转换
    if (entity.video) {
      dto.video = VideoResponseDto.fromEntity(entity.video);
    }

    return dto;
  }
}

/**
 * 观看历史列表响应DTO
 */
export class VideoHistoryListResponseDto {
  items: VideoHistoryResponseDto[];

  total: number;
}

/**
 * 观看历史查询参数DTO
 */
export class VideoHistoryQueryDto {
  @IsOptional()
  @IsNumber({}, { message: '页码必须是数字' })
  page?: number;

  @IsOptional()
  @IsNumber({}, { message: '每页数量必须是数字' })
  pageSize?: number;
}

/**
 * 视频观看统计响应DTO
 */
export class VideoWatchStatsDto {
  totalViews: number;

  completedViews: number;

  completionRate: string;
}
