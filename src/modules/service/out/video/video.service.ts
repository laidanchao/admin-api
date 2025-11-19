import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRequest } from '@dataui/crud';
import { BaseCrudService } from '@/common/base-crud.service';
import { VideoEntity } from '@/modules/service/out/video/entity/video.entity';

@Injectable()
export class VideoService extends BaseCrudService<VideoEntity> {
  private readonly logger = new Logger(VideoService.name);

  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {
    super(videoRepository);
  }

  /**
   * 获取视频列表
   */
  async findAll(query?: any): Promise<VideoEntity[]> {
    try {
      const queryBuilder = this.videoRepository
        .createQueryBuilder('video')
        .leftJoinAndSelect('video.category', 'category'); // 关联查询分类信息

      // 如果有搜索条件，可以在这里添加过滤
      if (query?.title) {
        queryBuilder.where('video.title LIKE :title', {
          title: `%${query.title}%`,
        });
      }

      // 添加分类ID的搜索条件
      if (query?.categoryId !== undefined && query.categoryId !== null) {
        queryBuilder.andWhere('video.categoryId = :categoryId', {
          categoryId: query.categoryId,
        });
      }

      // 按照创建时间降序排序
      queryBuilder.orderBy('video.createdAt', 'DESC');

      this.logger.debug(`查找视频列表，查询参数: ${JSON.stringify(query)}`);
      return await queryBuilder.getMany();
    } catch (error) {
      this.logger.error(`获取视频列表失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  // /**
  //  * 根据ID获取视频详情
  //  */
  // async findOne(id: number): Promise<VideoEntity> {
  //   try {
  //     this.logger.debug(`查找视频ID: ${id}`);
  //     const video = await this.videoRepository.findOne({
  //       where: { id },
  //       relations: ['category'], // 获取分类信息
  //     });
  //
  //     if (!video) {
  //       this.logger.warn(`视频不存在，ID: ${id}`);
  //       return null;
  //     }
  //
  //     return video;
  //   } catch (error) {
  //     this.logger.error(
  //       `获取视频详情失败，ID: ${id}，错误: ${error.message}`,
  //       error.stack,
  //     );
  //     throw error;
  //   }
  // }

  /**
   * 创建视频
   */
  async createOne(req: CrudRequest, dto: any): Promise<VideoEntity> {
    try {
      this.logger.debug(`创建视频: ${JSON.stringify(dto)}`);
      const result = await super.createOne(req, dto);
      this.logger.debug(`视频创建成功，ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`创建视频失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 更新视频
   */
  async updateOne(req: CrudRequest, dto: any): Promise<VideoEntity> {
    try {
      const id = req.parsed.paramsFilter[0].value;
      this.logger.debug(`更新视频ID: ${id}，更新数据: ${JSON.stringify(dto)}`);
      const result = await super.updateOne(req, dto);
      this.logger.debug(`视频更新成功，ID: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新视频失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  // /**
  //  * 删除视频
  //  */
  // async deleteOne(id: number): Promise<void> {
  //   try {
  //     this.logger.debug(`删除视频ID: ${id}`);
  //     await this.videoRepository.delete(id);
  //     this.logger.debug(`视频删除成功，ID: ${id}`);
  //   } catch (error) {
  //     this.logger.error(
  //       `删除视频失败，ID: ${id}，错误: ${error.message}`,
  //       error.stack,
  //     );
  //     throw error;
  //   }
  // }

  /**
   * 增加视频观看次数
   */
  async incrementViewCount(id: number): Promise<void> {
    try {
      this.logger.debug(`增加视频观看次数，ID: ${id}`);
      await this.videoRepository.increment({ id }, 'viewCount', 1);
      this.logger.debug(`视频观看次数增加成功，ID: ${id}`);
    } catch (error) {
      this.logger.error(
        `增加视频观看次数失败，ID: ${id}，错误: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
