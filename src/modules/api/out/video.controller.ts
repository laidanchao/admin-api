import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { VideoService } from '@/modules/service/out/video/video.service';
import {
  CreateVideoDto,
  UpdateVideoDto,
  VideoResponseDto,
  VideoListResponseDto,
  VideoQueryDto,
} from '@/modules/service/out/video/dto/video.dto';
import { Public } from '@/common/public.decorator';
import { VideoEntity } from '@/modules/service/out/video/entity/video.entity';

@Controller('out/video')
@Crud({
  model: {
    type: VideoEntity,
  },
  dto: {
    create: CreateVideoDto,
    update: UpdateVideoDto,
  },
  // routes: {
  //   only: ['createOneBase', 'updateOneBase', 'deleteOneBase'],
  // },
})
@UseInterceptors(ClassSerializerInterceptor)
export class VideoController {
  private readonly logger = new Logger(VideoController.name);

  constructor(public service: VideoService) {}

  /**
   * 获取视频列表
   */
  // @Public()
  // @Get()
  // async findAll(@Query() query: VideoQueryDto) {
  //   try {
  //     this.logger.log(`获取视频列表请求，查询参数: ${JSON.stringify(query)}`);
  //     const videos = await this.service.findAll(query);
  //     const result = new VideoListResponseDto();
  //     result.items = videos.map((m) => VideoResponseDto.fromEntity(m));
  //     result.total = videos.length;
  //
  //     this.logger.log(`获取视频列表成功，数量: ${videos.length}`);
  //     return result;
  //   } catch (error) {
  //     this.logger.error(`获取视频列表失败: ${error.message}`, error.stack);
  //     throw error;
  //   }
  // }

  /**
   * 获取视频详情
   */
  // @Public()
  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   try {
  //     this.logger.log(`获取视频详情请求，ID: ${id}`);
  //     const video = await this.service.findOneBy({ id });
  //
  //     if (!video) {
  //       this.logger.warn(`视频不存在，ID: ${id}`);
  //       throw new Error('视频不存在');
  //     }
  //
  //     this.logger.log(`获取视频详情成功，ID: ${id}`);
  //     return VideoResponseDto.fromEntity(video);
  //   } catch (error) {
  //     this.logger.error(
  //       `获取视频详情失败，ID: ${id}，错误: ${error.message}`,
  //       error.stack,
  //     );
  //     throw error;
  //   }
  // }

  // /**
  //  * 创建视频
  //  */
  // @Post()
  // async create(@Body() createDto: CreateVideoDto) {
  //   try {
  //     this.logger.log(`创建视频请求: ${JSON.stringify(createDto)}`);
  //     // 使用crud的createOneBase方法
  //     const result = await this.service.createOneBase(
  //       {
  //         parsed: {
  //           body: createDto,
  //         },
  //       } as any,
  //       createDto as any,
  //     );
  //
  //     this.logger.log(`创建视频成功，ID: ${result.id}`);
  //     return VideoResponseDto.fromEntity(result);
  //   } catch (error) {
  //     this.logger.error(`创建视频失败: ${error.message}`, error.stack);
  //     throw error;
  //   }
  // }

  // /**
  //  * 更新视频
  //  */
  // @Put(':id')
  // async update(@Param('id') id: number, @Body() updateDto: UpdateVideoDto) {
  //   try {
  //     this.logger.log(
  //       `更新视频请求，ID: ${id}，数据: ${JSON.stringify(updateDto)}`,
  //     );
  //     // 使用crud的updateOneBase方法
  //     const result = await this.service.updateOneBase(
  //       {
  //         parsed: {
  //           paramsFilter: [{ field: 'id', operator: '=', value: id }],
  //           body: updateDto,
  //         },
  //       } as any,
  //       updateDto as any,
  //     );
  //
  //     this.logger.log(`更新视频成功，ID: ${id}`);
  //     return VideoResponseDto.fromEntity(result);
  //   } catch (error) {
  //     this.logger.error(
  //       `更新视频失败，ID: ${id}，错误: ${error.message}`,
  //       error.stack,
  //     );
  //     throw error;
  //   }
  // }

  /**
   * 删除视频
   */
  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   try {
  //     this.logger.log(`删除视频请求，ID: ${id}`);
  //     await this.service.deleteOne(id);
  //     this.logger.log(`删除视频成功，ID: ${id}`);
  //     return { message: '删除成功' };
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
  @Post(':id/increment-view')
  async incrementViewCount(@Param('id') id: number) {
    try {
      this.logger.log(`增加视频观看次数请求，ID: ${id}`);
      await this.service.incrementViewCount(id);
      this.logger.log(`增加视频观看次数成功，ID: ${id}`);
      return { message: '观看次数更新成功' };
    } catch (error) {
      this.logger.error(
        `增加视频观看次数失败，ID: ${id}，错误: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
