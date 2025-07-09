import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    return Utils.convertToTreeDto(trees);
  }


  /**
   * 拼接菜单树
   * @param menus
   * @private
   */
  buildMenuTree(menus: MenuEntity[]): MenuTreeNode[] {
    const menuMap = new Map<number, MenuTreeNode>();
    const tree: MenuTreeNode[] = [];

    const allowedTypes: MenuType[] = [MenuType.CATALOG, MenuType.MENU];
    // 创建ID到菜单的映射
    menus.forEach(menu => {
      if (allowedTypes.includes(menu.type)) {
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
      }
    });

    // 构建树
    menuMap.forEach(menu => {
      if (!menu.parentId) {
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

}
