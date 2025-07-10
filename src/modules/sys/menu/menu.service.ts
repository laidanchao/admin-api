import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { MenuTreeNode } from '@/modules/sys/menu/menu.dto';
import { BaseCrudService } from '@/common/base-crud.service';
import { MenuType } from '@/common/enums';
import Utils from '@/common/utils';

@Injectable()
export class MenuService extends BaseCrudService<MenuEntity> {
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
      if (!menu.parentId || (!menuMap.has(menu.parentId) && !menus.some(s=>s.id === menu.parentId))) {
        tree.push(menu);
      } else {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          parent.children.push(menu);
        }
      }
    });

    return tree;
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
}
