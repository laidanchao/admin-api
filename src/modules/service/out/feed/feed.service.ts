import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { FeedEntity } from '@/modules/service/out/feed/feed.entity';
import { FeedDto } from '@/modules/service/out/feed/feed.dto';
import { FeedAuditStatus } from '@/common/enums';
import { FeedDetailEntity } from '@/modules/service/out/feed/feed-detail.entity';
import * as ExcelJS from 'exceljs';
import { Qiniu } from '@/common/qiniu';

@Injectable()
export class FeedService extends BaseCrudService<FeedEntity> {
  constructor(
    @InjectRepository(FeedEntity)
    public readonly repo: Repository<FeedEntity>,
    @InjectRepository(FeedDetailEntity)
    public readonly detailRepo: Repository<FeedDetailEntity>,
  ) {
    super(repo);
  }

  async save(body: FeedDto) {
    const feed = await this.repo.save({
      idNo: body.idNo,
      phone: body.phone,
      realName: body.realName,
      city: body.city,
      serviceArea: body.serviceArea,
      direction: body.direction,
      comment: body.comment,
      auditStatus: FeedAuditStatus.WAITING,
      createdBy: 'ldc',
    });

    const details = body.details.map((m) => {
      return FeedDetailEntity.create({
        feedId: feed.id,
        areaCode: m.areaCode,
        areaName: m.areaName,
        locationCode: m.locationCode,
        locationName: m.locationName,
        imgKey: m.imgKey,
        coverImgKey: m.coverImgKey,
        isVideo: m.isVideo,
      });
    });

    return await this.detailRepo.save(details);
  }

  async export(body: {
    keywords: string;
    city: string;
    serviceArea: string;
    auditStatus: FeedAuditStatus;
  }) {
    const feeds = await this.repo
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.details', 'detail')
      .where(
        body.keywords
          ? '(feed.realName LIKE :keywords OR feed.idNo LIKE :keywords OR feed.phone LIKE :keywords)'
          : '1=1', // 当没有条件时返回所有记录
        { keywords: `%${body.keywords}%` }, // 使用 LIKE 进行模糊搜索
      )
      .andWhere(body.city ? 'feed.city = :city' : '1=1', { city: body.city })
      .andWhere(body.serviceArea ? 'feed.serviceArea = :serviceArea' : '1=1', {
        serviceArea: body.serviceArea,
      })
      .andWhere(body.auditStatus ? 'feed.auditStatus = :auditStatus' : '1=1', {
        auditStatus: body.auditStatus,
      })
      .getMany();

    return this.exportWithImages(feeds);
  }

  async exportWithImages(data: FeedEntity[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('评价记录');

    // 设置列宽
    worksheet.columns = [
      { header: '姓名', key: 'realName', width: 15 },
      { header: '身份证', key: 'idNo', width: 20 },
      { header: '联系电话', key: 'phone', width: 15 },
      { header: '城市', key: 'city', width: 15 },
      { header: '服务区', key: 'serviceArea', width: 15 },
      { header: '行驶方向', key: 'direction', width: 10 },
      { header: '审核状态', key: 'auditStatus', width: 15 },
      { header: '评价', key: 'comment', width: 30 },
      { header: '区域', key: 'areaName', width: 15 },
      { header: '位置', key: 'locationName', width: 30 },
      { header: '照片', key: 'imgKey', width: 25 },
    ];
    const auditStatusMap = {
      WAITING: '待审核',
      SUCCESS: '审核通过',
      FAILED: '审核不通过',
    };

    this.setHeaderStyle(worksheet);

    let currentRow = 2;

    // 第一步：先创建所有行数据（不处理图片）
    const imageTasks: { row: number; imgKey: string }[] = [];

    for (const item of data) {
      for (let i = 0; i < item.details.length; i++) {
        const subItem = item.details[i];
        const rowData = {
          realName: i === 0 ? item.realName : '',
          idNo: i === 0 ? item.idNo : '',
          phone: i === 0 ? item.phone : '',
          city: i === 0 ? item.city : '',
          serviceArea: i === 0 ? item.serviceArea : '',
          direction: i === 0 ? item.direction : '',
          auditStatus: i === 0 ? auditStatusMap[item.auditStatus] : '',
          comment: i === 0 ? item.comment : '',
          areaName: subItem.areaName,
          locationName: subItem.locationName,
        };

        const row = worksheet.addRow(rowData);
        row.height = 120;
        this.setRowStyle(row, currentRow, i);

        // 记录需要处理图片的行
        if (subItem.imgKey && !subItem.isVideo) {
          imageTasks.push({
            row: currentRow,
            imgKey: subItem.imgKey,
          });
        }

        currentRow++;
      }
    }

    console.log(`所有数据行创建完成，共${currentRow - 2}行`);
    console.log(`需要处理${imageTasks.length}张图片`);

    // 第二步：单独处理所有图片
    for (const task of imageTasks) {
      console.log(`开始处理第${task.row}行图片: ${task.imgKey}`);
      await this.addQiniuImageToCell(worksheet, task.imgKey, task.row);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  private async addQiniuImageToCell(
    worksheet: ExcelJS.Worksheet,
    imageKey: string,
    currentRow: number,
  ): Promise<void> {
    try {
      console.log(`正在下载图片: ${imageKey}`);

      // 从七牛云获取图片 buffer
      const imageUrl = new Qiniu().getDownloadUrl(imageKey);
      console.log(imageUrl);
      const imageBuffer = await this.downloadImage(imageUrl);

      // 获取图片格式
      const extension = this.getImageExtensionFromUrl(imageUrl);

      const imageId = worksheet.workbook.addImage({
        buffer: imageBuffer,
        extension: extension as 'png' | 'jpeg' | 'gif',
      });

      // 计算单元格位置（K列是第11列，索引为10）
      const colIndex = 10;
      const rowIndex = currentRow - 1;
      console.log('currentRow', currentRow);
      worksheet.addImage(imageId, {
        tl: { col: colIndex, row: rowIndex },
        br: { col: colIndex + 1, row: rowIndex + 1 },
        editAs: 'oneCell',
      });

      console.log(`成功添加图片到 k${currentRow}`);
    } catch (error) {
      console.warn(`添加七牛云图片失败 ${imageKey}:`, error.message);

      // 添加错误提示
      const cell = worksheet.getCell(`k${currentRow}`);
      cell.value = '[图片加载失败]';
      cell.font = { color: { argb: 'FF0000' }, italic: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    }
  }

  // 设置表头样式
  private setHeaderStyle(worksheet: ExcelJS.Worksheet) {
    const headerRow = worksheet.getRow(1);
    headerRow.height = 35;

    headerRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '2E75B6' },
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.border = {
        top: { style: 'medium', color: { argb: '1F4E78' } },
        left: { style: 'medium', color: { argb: '1F4E78' } },
        bottom: { style: 'medium', color: { argb: '1F4E78' } },
        right: { style: 'medium', color: { argb: '1F4E78' } },
      };
    });
  }

  // 设置行样式
  private setRowStyle(row: ExcelJS.Row, groupIndex: number, rowIndex: number) {
    row.eachCell((cell, colNumber) => {
      cell.alignment = {
        vertical: 'middle',
        wrapText: true,
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'D0D0D0' } },
        left: { style: 'thin', color: { argb: 'D0D0D0' } },
        bottom: { style: 'thin', color: { argb: 'D0D0D0' } },
        right: { style: 'thin', color: { argb: 'D0D0D0' } },
      };

      // 交替行颜色
      const isEvenGroup = groupIndex % 2 === 0;
      if (isEvenGroup) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rowIndex % 2 === 0 ? 'F8F9FA' : 'FFFFFF' },
        };
      } else {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rowIndex % 2 === 0 ? 'F0F8FF' : 'FFFFFF' },
        };
      }
    });
  }

  // 下载网络图片
  private async downloadImage(url: string): Promise<Buffer> {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  // 从URL获取图片扩展名
  private getImageExtensionFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const extension =
        pathname.split('.').pop()?.toLowerCase().split('?')[0] || 'jpeg';

      switch (extension) {
        case 'jpg':
        case 'jpeg':
          return 'jpeg';
        case 'png':
          return 'png';
        case 'gif':
          return 'gif';
        default:
          return 'jpeg';
      }
    } catch {
      return 'jpeg';
    }
  }
}
