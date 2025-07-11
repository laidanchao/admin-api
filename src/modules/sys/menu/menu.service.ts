import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { CreateMenuDto, MenuTreeNode, UpdateMenuDto } from '@/modules/sys/menu/menu.dto';
import { MenuType } from '@/common/enums';
import Utils from '@/common/utils';
import { OptionDto } from '@/common/common.dto';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { UserDto } from '@/common/user.decorator';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { omit } from 'lodash';

@Injectable()
export class MenuService extends TypeOrmCrudService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    public readonly repo: Repository<MenuEntity>,
  ) {
    super(repo);
  }

  async getFullTree() {
    const menus = await this.repo.findBy({
      type: In([MenuType.CATALOG, MenuType.MENU]),
    });
    const trees = this.buildMenuTree(menus);
    return Utils.convertToFrontTreeDto(trees);
  }


  /**
   * 拼接菜单树
   * @param menus
   * @private
   */
  buildMenuTree(menus: MenuEntity[]): MenuTreeNode[] {
    const menuMap = new Map<number, MenuTreeNode>();
    const tree: MenuTreeNode[] = [];
    // 创建ID到菜单的映射
    menus.forEach(menu => {
      menuMap.set(menu.id, {
        id: menu.id,
        parentId: menu.parentId,
        name: menu.name,
        path: menu.path,
        type: menu.type,
        icon: menu.icon,
        sort: menu.sort,
        children: [],
      });
    });

    // 构建树
    menuMap.forEach(menu => {
      if (!menu.parentId || (!menuMap.has(menu.parentId) && !menus.some(s => s.id === menu.parentId))) {
        tree.push(menu);
      } else {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          parent.children.push(menu);
          parent.children.sort((a, b) => a.sort - b.sort);
        }
      }
    });

    return tree.sort((a, b) => a.sort - b.sort);
  }

  /**
   * 查询菜单列表
   */
  async getMenuList(keywords: string) {
    let menus;
    if (keywords) {
      menus = await this.repo.findBy({
        name: Like(`%${keywords}%`),
      });
    } else {
      menus = await this.repo.find();
    }

    return this.buildMenuTree(menus);
  }


  /**
   * 获取菜单下拉数据源
   */
  @Get('options')
  async getOptions(): Promise<OptionDto[]> {
    const roles = await this.repo.find();
    return roles.map(m => {
      return <OptionDto>{
        value: m.id,
        label: m.name,
      };
    });
  }

  async createMenu(body: CreateMenuDto, operator: UserDto) {
    let parent = null;
    if (body.parentId > 0) {
      parent = await this.repo.findOneByOrFail({
        id: body.parentId,
      });
    }

    const menu: DeepPartial<MenuEntity> = {
      ...omit(body,'parentId'),
      parent: parent,
      createBy: operator.username,
      updateBy: operator.username,
    };

    return this.repo.save(menu);
  }

  async updateMenu(id: number, body: UpdateMenuDto, operator: UserDto) {
    const menu = await this.repo.findOneByOrFail({
      id,
    });

    let parent = null;
    if (body.parentId > 0) {
      parent = await this.repo.findOneByOrFail({
        id: body.parentId,
      });
    }

    menu.name = body.name;
    menu.path = body.path;
    menu.icon = body.icon;
    menu.sort = body.sort;
    menu.parent = parent;
    menu.updateBy = operator.username;

    return this.repo.save(menu);
  }
}
