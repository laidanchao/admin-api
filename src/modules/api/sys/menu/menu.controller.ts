import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MenuService } from '@/modules/service/sys/menu/menu.service';
import { Crud } from '@dataui/crud';
import { MenuEntity } from '@/modules/service/sys/menu/menu.entity';
import { CreateMenuDto, UpdateMenuDto } from '@/modules/service/sys/menu/menu.dto';
import { User, UserDto } from '@/common/user.decorator';

@Crud({
  model: {
    type: MenuEntity,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
})
@Controller('sys/menu')
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


  /**
   * 获取菜单下拉数据源
   */
  @Get('options')
  async options() {
    return await this.service.getOptions();
  }

  @Post('createMenu')
  async createMenu(@Body() body: CreateMenuDto, @User() user:UserDto){
    return await this.service.createMenu(body,user);
  }

  @Post('updateMenu/:id')
  async updateMenu(@Param('id') id:number, @Body() body: UpdateMenuDto, @User() user:UserDto){
    return await this.service.updateMenu(id,body,user);
  }

  /**
   * 删除菜单
   * @param ids
   */
  @Post('deleteByIds')
  async deleteByIds(@Body() ids: number[]) {
    return await this.service.deleteByIds(ids);
  }
}
