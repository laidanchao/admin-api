import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Crud } from '@dataui/crud';

import { VideoHistoryService } from '@/modules/service/out/video/video-history.service';
import {
  SaveVideoHistoryDto,
  VideoHistoryResponseDto,
  VideoHistoryListResponseDto,
  VideoHistoryQueryDto,
  VideoWatchStatsDto,
} from '@/modules/service/out/video/dto/video-history.dto';
import { Public } from '@/common/public.decorator';
import { VideoHistoryEntity } from '@/modules/service/out/video/entity/video-history.entity';

@Controller('out/video-history')
@Crud({
  model: {
    type: VideoHistoryEntity,
  },
  dto: {
    create: SaveVideoHistoryDto,
  },
  routes: {
    // only: ['createOneBase'],
  },
})
@UseInterceptors(ClassSerializerInterceptor)
export class VideoHistoryController {
  private readonly logger = new Logger(VideoHistoryController.name);

  constructor(public service: VideoHistoryService) {}

  // /**
  //  * 保存或更新观看历史
  //  */
  // @Public()
  // @Post()
  // async saveOrUpdateHistory(@Body() historyDto: SaveVideoHistoryDto) {
  //   try {
  //     this.logger.log(`保存/更新观看历史请求: ${JSON.stringify(historyDto)}`);
  //     const history = await this.service.saveOrUpdateHistory(historyDto);
  //     this.logger.log(`保存/更新观看历史成功，ID: ${history.id}`);
  //     return VideoHistoryResponseDto.fromEntity(history);
  //   } catch (error) {
  //     this.logger.error(`保存/更新观看历史失败: ${error.message}`, error.stack);
  //     throw error;
  //   }
  // }
  //
  // /**
  //  * 获取用户的观看历史列表
  //  */
  // @Public()
  // @Get('client/:clientId')
  // async getClientHistoryList(
  //   @Param('clientId') clientId: number,
  //   @Query() query: VideoHistoryQueryDto,
  // ) {
  //   try {
  //     this.logger.log(
  //       `获取用户观看历史请求，clientId: ${clientId}，查询参数: ${JSON.stringify(query)}`,
  //     );
  //     const { page = 1, pageSize = 10 } = query;
  //     const offset = (page - 1) * pageSize;
  //
  //     const histories = await this.service.getClientHistoryList(
  //       clientId,
  //       pageSize,
  //       offset,
  //     );
  //
  //     // 这里可以添加获取总数的逻辑，暂时使用当前列表长度作为演示
  //     const result = new VideoHistoryListResponseDto();
  //     result.items = histories.map((m) =>
  //       VideoHistoryResponseDto.fromEntity(m),
  //     );
  //     result.total = histories.length;
  //
  //     this.logger.log(`获取用户观看历史成功，数量: ${histories.length}`);
  //     return result;
  //   } catch (error) {
  //     this.logger.error(
  //       `获取用户观看历史失败，clientId: ${clientId}，错误: ${error.message}`,
  //       error.stack,
  //     );
  //     throw error;
  //   }
  // }
  //
  // /**
  //  * 获取用户观看特定视频的历史
  //  */
  // @Public()
  // @Get('client/:clientId/video/:videoId')
  // async getClientVideoHistory(
  //   @Param('clientId') clientId: number,
  //   @Param('videoId') videoId: number,
  // ) {
  //   try {
  //     this.logger.log(
  //       `获取用户视频历史请求，clientId: ${clientId}, videoId: ${videoId}`,
  //     );
  //     const history = await this.service.getClientVideoHistory(
  //       clientId,
  //       videoId,
  //     );
  //
  //     if (!history) {
  //       this.logger.warn(
  //         `未找到用户视频历史，clientId: ${clientId}, videoId: ${videoId}`,
  //       );
  //       return null;
  //     }
  //
  //     this.logger.log(`获取用户视频历史成功，ID: ${history.id}`);
  //     return VideoHistoryResponseDto.fromEntity(history);
  //   } catch (error) {
  //     this.logger.error(
  //       `获取用户视频历史失败，clientId: ${clientId}, videoId: ${videoId}，错误: ${error.message}`,
  //       error.stack,
  //     );
  //     throw error;
  //   }
  // }
  //
  // /**
  //  * 删除用户的观看历史
  //  */
  // @Delete('client/:clientId')
  // async deleteClientHistory(
  //   @Param('clientId') clientId: number,
  //   @Query('videoId') videoId?: number,
  // ) {
  //   try {
  //     this.logger.log(
  //       `删除用户观看历史请求，clientId: ${clientId}, videoId: ${videoId || 'all'}`,
  //     );
  //     await this.service.deleteClientHistory(clientId, videoId);
  //     this.logger.log(`删除用户观看历史成功`);
  //     return { message: '删除成功' };
  //   } catch (error) {
  //     this.logger.error(`删除用户观看历史失败: ${error.message}`, error.stack);
  //     throw error;
  //   }
  // }

  /**
   * 获取视频的观看统计
   */
  @Public()
  @Get('stats/video/:videoId')
  async getVideoWatchStats(@Param('videoId') videoId: number) {
    try {
      this.logger.log(`获取视频观看统计请求，videoId: ${videoId}`);
      const stats = await this.service.getVideoWatchStats(videoId);

      // 计算完成率
      const completionRate =
        stats.totalViews > 0
          ? `${((stats.completedViews / stats.totalViews) * 100).toFixed(2)}%`
          : '0.00%';

      const result = new VideoWatchStatsDto();
      result.totalViews = stats.totalViews;
      result.completedViews = stats.completedViews;
      result.completionRate = completionRate;

      this.logger.log(`获取视频观看统计成功，videoId: ${videoId}`);
      return result;
    } catch (error) {
      this.logger.error(
        `获取视频观看统计失败，videoId: ${videoId}，错误: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
