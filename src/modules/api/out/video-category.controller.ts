import { VideoCategoryService } from '../../service/out/video/video-category.service';
import {
  CreateVideoCategoryDto,
  UpdateVideoCategoryDto,
  VideoCategoryResponseDto,
  VideoCategoryListResponseDto,
  VideoCategoryQueryDto,
} from '@/modules/service/out/video/dto/video-category.dto';
import { Public } from '@/common/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User, UserDto } from '@/common/user.decorator';
import { Crud } from '@dataui/crud';
import { VideoHistoryEntity } from '@/modules/service/out/video/entity/video-history.entity';
import { SaveVideoHistoryDto } from '@/modules/service/out/video/dto/video-history.dto';
import { VideoCategory } from '@/modules/service/out/video/entity/video-category.entity';

@Controller('out/video-category')
@Crud({
  model: {
    type: VideoCategory,
  },
  dto: {
    create: CreateVideoCategoryDto,
  },
  routes: {
    // only: ['createOneBase'],
  },
})
export class VideoCategoryController {
  private readonly logger = new Logger(VideoCategoryController.name);

  constructor(private readonly service: VideoCategoryService) {}

  /**
   * 获取分类列表（公开接口）
   */
  // @Public()
  // @Get('list')
  // async getCategoryList(
  //   @Query() query: VideoCategoryQueryDto,
  // ): Promise<VideoCategoryListResponseDto> {
  //   this.logger.log(`获取分类列表请求，参数: ${JSON.stringify(query)}`);
  //   try {
  //     const categories = await this.videoCategoryService.findAllCategories(
  //       query.enabled,
  //     );
  //     const items = categories.map((category) =>
  //       VideoCategoryResponseDto.fromEntity(category),
  //     );
  //
  //     return {
  //       items,
  //       total: items.length,
  //     };
  //   } catch (error) {
  //     this.logger.error(`获取分类列表失败: ${error.message}`);
  //     throw error;
  //   }
  // }

  /**
   * 获取分类详情（公开接口）
   */
  // @Public()
  // @Get(':id')
  // async getCategoryDetail(
  //   @Param('id') id: number,
  // ): Promise<VideoCategoryResponseDto> {
  //   this.logger.log(`获取分类详情请求，ID: ${id}`);
  //   try {
  //     const category = await this.videoCategoryService.findOneCategory(id);
  //     if (!category) {
  //       throw new Error('分类不存在');
  //     }
  //     return VideoCategoryResponseDto.fromEntity(category);
  //   } catch (error) {
  //     this.logger.error(`获取分类详情失败: ${error.message}`);
  //     throw error;
  //   }
  // }

  /**
   * 创建分类（需要登录）
   */
  // @Post()
  // async createCategory(
  //   @Body() createDto: CreateVideoCategoryDto,
  //   @User() user: UserDto,
  // ): Promise<VideoCategoryResponseDto> {
  //   this.logger.log(`创建分类请求，用户: ${user.username}`);
  //   try {
  //     // 检查分类名称是否已存在
  //     const isExists = await this.videoCategoryService.isCategoryNameExists(
  //       createDto.name,
  //     );
  //     if (isExists) {
  //       throw new Error('分类名称已存在');
  //     }
  //
  //     const category = await this.videoCategoryService.createCategory(
  //       createDto,
  //       user.username,
  //     );
  //     return VideoCategoryResponseDto.fromEntity(category);
  //   } catch (error) {
  //     this.logger.error(`创建分类失败: ${error.message}`);
  //     throw error;
  //   }
  // }

  /**
   * 更新分类（需要登录）
   */
  // @Put(':id')
  // async updateCategory(
  //   @Param('id') id: number,
  //   @Body() updateDto: UpdateVideoCategoryDto,
  //   @User() user: UserDto,
  // ): Promise<VideoCategoryResponseDto> {
  //   this.logger.log(`更新分类请求，ID: ${id}，用户: ${user.username}`);
  //   try {
  //     // 如果更新了名称，检查是否与其他分类重复
  //     if (updateDto.name) {
  //       const isExists = await this.videoCategoryService.isCategoryNameExists(
  //         updateDto.name,
  //         id,
  //       );
  //       if (isExists) {
  //         throw new Error('分类名称已存在');
  //       }
  //     }
  //
  //     const category = await this.videoCategoryService.updateCategory(
  //       id,
  //       updateDto,
  //       user.username,
  //     );
  //     return VideoCategoryResponseDto.fromEntity(category);
  //   } catch (error) {
  //     this.logger.error(`更新分类失败: ${error.message}`);
  //     throw error;
  //   }
  // }

  /**
   * 删除分类（需要登录）
   */
  // @Delete(':id')
  // async deleteCategory(
  //   @Param('id') id: number,
  // ): Promise<{ success: boolean; message: string }> {
  //   this.logger.log(`删除分类请求，ID: ${id}`);
  //   try {
  //     await this.videoCategoryService.deleteCategory(id);
  //     return {
  //       success: true,
  //       message: '分类删除成功',
  //     };
  //   } catch (error) {
  //     this.logger.error(`删除分类失败: ${error.message}`);
  //     throw error;
  //   }
  // }

  /**
   * 获取启用的分类列表（公开接口，供前端选择）
   */
  // @Public()
  // @Get('enabled/list')
  // async getEnabledCategories(): Promise<VideoCategoryResponseDto[]> {
  //   this.logger.log('获取启用的分类列表请求');
  //   try {
  //     const categories =
  //       await this.videoCategoryService.findAllCategories(true);
  //     return categories.map((category) =>
  //       VideoCategoryResponseDto.fromEntity(category),
  //     );
  //   } catch (error) {
  //     this.logger.error(`获取启用的分类列表失败: ${error.message}`);
  //     throw error;
  //   }
  // }
}
