import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { RoleEntity } from '@/modules/service/sys/role/role.entity';
import { BaseCrudService } from '@/common/base-crud.service';
import { OptionDto } from '@/common/common.dto';
import { MenuType } from '@/common/enums';
import { UserDto } from '@/common/user.decorator';
import { MenuEntity } from '@/modules/service/sys/menu/menu.entity';

@Injectable()
export class RoleService extends BaseCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    public readonly repo: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    public readonly menuRepo: Repository<MenuEntity>,
  ) {
    super(repo);
  }

  /**
   * 获取角色下拉数据源
   */
  async getOptions(): Promise<OptionDto[]> {
    const roles = await this.repo.findBy({
      code:Not('ROOT')
    });
    return roles.map(m => {
      return <OptionDto>{
        value: m.id,
        label: m.name,
      };
    });
  }

  /**
   * 获取菜单的id集合
   * @param id
   */
  async getMenuIds(id: number) {
    const role = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: ['menus'],
    });

    const allowedTypes: MenuType[] = [MenuType.CATALOG, MenuType.MENU];
    return role.menus.filter(f => allowedTypes.includes(f.type)).map(m => m.id);
  }

  /**
   * 更新角色的菜单
   * @param id
   * @param menuIds
   * @param user
   */
  async updateRoleMenus(id: number, menuIds: number[], user: UserDto) {
    const role = await this.repo.findOneByOrFail({ id });
    const menus = await this.menuRepo.findBy({
      id: In(menuIds),
    });
    role.menus = menus;
    return this.repo.save(role);
  }
}
