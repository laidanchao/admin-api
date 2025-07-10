import { Controller, Get, Query } from '@nestjs/common';
import { MenuService } from '@/modules/sys/menu/menu.service';
import { Crud } from '@dataui/crud';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { AddMenuDto } from '@/modules/sys/menu/menu.dto';

@Crud({
  model: {
    type: MenuEntity,
  },
  dto: {
    create: AddMenuDto,
  },
})
@Controller('api/sys/menu')
export class MenuController {
  constructor(private readonly service: MenuService) {
  }

  /**
   * 查询完整菜单树
   */
  @Get('getFullTree')
  async getFullTree() {
    return await this.service.getFullTree();
  }

  /**
   * 查询菜单列表
   * @param query
   */
  @Get('getMenuList')
  async getMenuList(@Query() query: { keywords: string }) {
    return await this.service.getMenuList(query.keywords);
  }

}
