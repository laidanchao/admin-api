import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { chain } from 'lodash';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { MenuService } from '@/modules/sys/menu/menu.service';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public readonly repo: Repository<UserEntity>,
    private readonly menuService: MenuService,
  ) {
    super(repo);
  }

  /**
   * 获取用户所有菜单的树
   * @param id
   */
  async getMenuTree(id: number) {
    const menus = await this.getMenusByUserId(id);
    const tree = this.menuService.buildMenuTree(menus);
    return tree;
  }

  /**
   * 根据用户id获取所有菜单
   * @param id
   */
  private async getMenusByUserId(id: number): Promise<MenuEntity[]> {
    const user = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: ['roles', 'roles.menus'],
    });
    if(user.roles[0].code==='ADMIN'){
      return await this.menuService.find();
    }else{
      return chain(user.roles).flatMap('menus').uniqBy('id').value();
    }
  }
}
