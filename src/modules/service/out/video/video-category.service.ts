import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { VideoCategory } from '@/modules/service/out/video/entity/video-category.entity';

@Injectable()
export class VideoCategoryService extends BaseCrudService<VideoCategory> {
  private readonly logger = new Logger(VideoCategoryService.name);

  constructor(
    @InjectRepository(VideoCategory)
    private videoCategoryRepository: Repository<VideoCategory>,
  ) {
    super(videoCategoryRepository);
  }

  /**
   * 获取所有分类列表
   * @param enabled 是否只获取启用的分类
   */
  async findAllCategories(enabled?: boolean): Promise<VideoCategory[]> {
    this.logger.log(`开始获取分类列表，enabled: ${enabled}`);
    try {
      const query = this.videoCategoryRepository.createQueryBuilder('category');

      if (enabled !== undefined) {
        query.where('category.enabled = :enabled', { enabled });
      }

      query.orderBy('category.sort', 'ASC');
      query.orderBy('category.id', 'ASC');

      const result = await query.getMany();
      this.logger.log(`获取分类列表成功，返回 ${result.length} 条数据`);
      return result;
    } catch (error) {
      this.logger.error(`获取分类列表失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 根据ID获取分类详情
   * @param id 分类ID
   */
  async findOneCategory(id: number): Promise<VideoCategory> {
    this.logger.log(`开始获取分类详情，ID: ${id}`);
    try {
      const result = await this.videoCategoryRepository.findOne({
        where: { id },
      });
      if (!result) {
        this.logger.warn(`分类不存在，ID: ${id}`);
      }
      return result;
    } catch (error) {
      this.logger.error(`获取分类详情失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 创建分类
   * @param data 分类数据
   * @param creator 创建者
   */
  async createCategory(
    data: Partial<VideoCategory>,
    creator: string,
  ): Promise<VideoCategory> {
    this.logger.log(`开始创建分类: ${data.name}`);
    try {
      const category = this.videoCategoryRepository.create({
        ...data,
        createdBy: creator,
        updatedBy: creator,
      });

      const result = await this.videoCategoryRepository.save(category);
      this.logger.log(`创建分类成功，ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`创建分类失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 更新分类
   * @param id 分类ID
   * @param data 更新数据
   * @param updater 更新者
   */
  async updateCategory(
    id: number,
    data: Partial<VideoCategory>,
    updater: string,
  ): Promise<VideoCategory> {
    this.logger.log(`开始更新分类，ID: ${id}`);
    try {
      const category = await this.findOneCategory(id);
      if (!category) {
        throw new Error(`分类不存在，ID: ${id}`);
      }

      const updatedCategory = {
        ...category,
        ...data,
        updatedBy: updater,
      };

      const result = await this.videoCategoryRepository.save(updatedCategory);
      this.logger.log(`更新分类成功，ID: ${id}`);
      return result;
    } catch (error) {
      this.logger.error(`更新分类失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 删除分类
   * @param id 分类ID
   */
  async deleteCategory(id: number): Promise<void> {
    this.logger.log(`开始删除分类，ID: ${id}`);
    try {
      const result = await this.videoCategoryRepository.delete(id);
      if (result.affected === 0) {
        throw new Error(`分类不存在，ID: ${id}`);
      }
      this.logger.log(`删除分类成功，ID: ${id}`);
    } catch (error) {
      this.logger.error(`删除分类失败: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * 检查分类名称是否已存在
   * @param name 分类名称
   * @param excludeId 排除的分类ID（用于更新时）
   */
  async isCategoryNameExists(
    name: string,
    excludeId?: number,
  ): Promise<boolean> {
    this.logger.log(`检查分类名称是否存在: ${name}`);
    try {
      const query = this.videoCategoryRepository
        .createQueryBuilder('category')
        .where('category.name = :name', { name });

      if (excludeId) {
        query.andWhere('category.id != :excludeId', { excludeId });
      }

      const count = await query.getCount();
      return count > 0;
    } catch (error) {
      this.logger.error(`检查分类名称失败: ${error.message}`, error.stack);
      throw error;
    }
  }
}
