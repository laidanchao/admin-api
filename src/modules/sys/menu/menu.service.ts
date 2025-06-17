import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { MenuTreeNode } from '@/modules/sys/menu/menu.dto';

@Injectable()
export class MenuService extends TypeOrmCrudService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    public readonly repo: Repository<MenuEntity>,
  ) {
    super(repo);
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
