import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { CrudRequest } from '@dataui/crud';
import { VideoHistoryEntity } from '@/modules/service/out/video/entity/video-history.entity';

@Injectable()
export class VideoHistoryService extends BaseCrudService<VideoHistoryEntity> {
  private readonly logger = new Logger(VideoHistoryService.name);

  constructor(
    @InjectRepository(VideoHistoryEntity)
    private readonly videoHistoryRepository: Repository<VideoHistoryEntity>,
  ) {
    super(videoHistoryRepository);
  }

  /**
   * 保存或更新观看历史
   */
  async saveOrUpdateHistory(historyData: {
    clientId: number;
    videoId: number;
    position: number;
    lastPlayTime?: Date;
    isCompleted?: boolean;
    createdBy?: string;
  }): Promise<VideoHistoryEntity> {
    try {
      this.logger.debug(`保存/更新观看历史: ${JSON.stringify(historyData)}`);

      // 查找是否已存在观看历史
      let history = await this.videoHistoryRepository.findOne({
        where: {
          clientId: historyData.clientId,
          videoId: historyData.videoId,
        },
      });

      if (history) {
        // 更新现有历史
        history.position = historyData.position;
        if (!history.isCompleted) {
          history.isCompleted = historyData.isCompleted || history.isCompleted;
        }
        history.updatedBy = historyData.createdBy;
        history = await this.videoHistoryRepository.save(history);
        this.logger.debug(`更新观看历史成功，ID: ${history.id}`);
      } else {
        // 创建新历史
        history = this.videoHistoryRepository.create({
          ...historyData,
          isCompleted: historyData.isCompleted || false,
          createdBy: 'system'
        });
        history = await this.videoHistoryRepository.save(history);
        this.logger.debug(`创建观看历史成功，ID: ${history.id}`);
      }

      return history;
    } catch (error) {
      this.logger.error(`保存/更新观看历史失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 获取用户的观看历史列表
   */
  async getClientHistoryList(
    clientId: number,
    limit: number = 20,
    offset: number = 0,
  ): Promise<VideoHistoryEntity[]> {
    try {
      this.logger.debug(
        `获取用户观看历史，clientId: ${clientId}, limit: ${limit}, offset: ${offset}`,
      );

      const histories = await this.videoHistoryRepository.find({
        where: { clientId },
        relations: ['video'], // 关联查询视频信息
        order: { updatedAt: 'DESC' }, // 按照最后播放时间降序
        take: limit,
        skip: offset,
      });

      this.logger.debug(`获取用户观看历史成功，数量: ${histories.length}`);
      return histories;
    } catch (error) {
      this.logger.error(
        `获取用户观看历史失败，clientId: ${clientId}，错误: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * 获取用户观看特定视频的历史
   */
  async getClientVideoHistory(
    clientId: number,
    videoId: number,
  ): Promise<VideoHistoryEntity | null> {
    try {
      this.logger.debug(
        `获取用户视频历史，clientId: ${clientId}, videoId: ${videoId}`,
      );

      const history = await this.videoHistoryRepository.findOne({
        where: { clientId, videoId },
        relations: ['video'],
      });

      if (!history) {
        this.logger.debug(
          `未找到用户视频历史，clientId: ${clientId}, videoId: ${videoId}`,
        );
      }

      return history;
    } catch (error) {
      this.logger.error(
        `获取用户视频历史失败，clientId: ${clientId}, videoId: ${videoId}，错误: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // /**
  //  * 删除用户的观看历史
  //  */
  // async deleteClientHistory(clientId: number, videoId?: number): Promise<void> {
  //   try {
  //     let deleteQuery = { clientId };
  //     if (videoId) {
  //       deleteQuery = { ...deleteQuery, videoId };
  //       this.logger.debug(
  //         `删除用户特定视频历史，clientId: ${clientId}, videoId: ${videoId}`,
  //       );
  //     } else {
  //       this.logger.debug(`删除用户所有观看历史，clientId: ${clientId}`);
  //     }
  //
  //     await this.videoHistoryRepository.delete(deleteQuery);
  //     this.logger.debug(`删除观看历史成功`);
  //   } catch (error) {
  //     this.logger.error(`删除观看历史失败: ${error.message}`, error.stack);
  //     throw error;
  //   }
  // }

  /**
   * 获取视频的观看统计
   */
  async getVideoWatchStats(videoId: number): Promise<{
    totalViews: number;
    completedViews: number;
  }> {
    try {
      this.logger.debug(`获取视频观看统计，videoId: ${videoId}`);

      const [totalViews, completedViews] = await Promise.all([
        this.videoHistoryRepository.count({ where: { videoId } }),
        this.videoHistoryRepository.count({
          where: { videoId, isCompleted: true },
        }),
      ]);

      return {
        totalViews,
        completedViews,
      };
    } catch (error) {
      this.logger.error(
        `获取视频观看统计失败，videoId: ${videoId}，错误: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * 创建观看历史
   */
  async createOne(req: CrudRequest, dto: any): Promise<VideoHistoryEntity> {
    try {
      this.logger.debug(`创建观看历史: ${JSON.stringify(dto)}`);
      const result = await super.createOne(req, dto);
      this.logger.debug(`观看历史创建成功，ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`创建观看历史失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 更新观看历史
   */
  async updateOne(req: CrudRequest, dto: any): Promise<VideoHistoryEntity> {
    try {
      const id = req.parsed.paramsFilter[0].value;
      this.logger.debug(
        `更新观看历史ID: ${id}，更新数据: ${JSON.stringify(dto)}`,
      );
      const result = await super.updateOne(req, dto);
      this.logger.debug(`观看历史更新成功，ID: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新观看历史失败: ${error.message}`, error.stack);
      throw error;
    }
  }
}
