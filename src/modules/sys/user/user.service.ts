import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/sys/user/user.entity';
import { chain, padStart } from 'lodash';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { MenuService } from '@/modules/sys/menu/menu.service';
import { CreateUserDto, UpdateUserDto } from '@/modules/sys/user/user.dto';
import { RoleEntity } from '@/modules/sys/role/role.entity';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { UserDto } from '@/common/user.decorator';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MenuTreeNode } from '@/modules/sys/menu/menu.dto';
import { MenuType } from '@/common/enums';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public readonly repo: Repository<UserEntity>,
    private datasource: DataSource,
    private readonly menuService: MenuService,
  ) {
    super(repo);
  }

  /**
   * 获取用户所有菜单的树
   * @param id
   */
  async getMenuTree(id: number): Promise<MenuTreeNode[]> {
    const menus = await this.getMenusByUserId(id);
    const allowTypes: MenuType[] = [MenuType.CATALOG, MenuType.MENU];
    const menuList = menus.filter(f => allowTypes.includes(f.type));
    const tree = this.menuService.buildMenuTree(menuList);
    return tree;
  }

  /**
   * 根据用户id获取所有菜单
   * @param id
   */
  async getMenusByUserId(id: number): Promise<MenuEntity[]> {
    const user = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: ['roles', 'roles.menus'],
    });
    if (user.roles[0].code === 'ROOT') {
      return await this.menuService.find();
    } else {
      return chain(user.roles).flatMap('menus').uniqBy('id').value();
    }
  }

  async me(id: number) {
    const user = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: ['roles'],
    });

    const menus = await this.getMenusByUserId(id);

    const buttons = menus.filter(f => f.type === MenuType.BUTTON);
    return {
      ...user,
      permissions: buttons.map(m => m.permission),
    };
  }

  /**
   * 获取指定用户信息
   * @param id
   */
  async getUserInfo(id: number) {
    const user = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: ['roles'],
    });

    return {
      ...user,
      roleIds: user.roles.map(m => m.id),
    };
  }

  /**
   * 创建用户
   * @param body
   */
  async createUser(body: CreateUserDto, operator: UserDto) {
    const roles = await this.datasource.getRepository(RoleEntity).findBy({
      id: In(body.roleIds),
    });

    const dept = await this.datasource.getRepository(DeptEntity).findOneByOrFail({
      id: body.deptId,
    });

    return await this.repo.save({
      username: body.username,
      password: body.password,
      userNo: body.userNo,
      nickname: body.nickname,
      gender: body.gender,
      avatar: body.avatar,
      qq: body.qq,
      email: body.email,
      phone: body.phone,
      status: body.status,
      dept,
      roles,
      createBy: operator.username,
      updateBy: operator.username,
    });
  }

  /**
   * 更新用户
   * @param id
   * @param body
   * @param operator
   */
  async updateUser(id: number, body: UpdateUserDto, operator: UserDto) {

    const user = await this.repo.findOneByOrFail({ id });

    const roles = await this.datasource.getRepository(RoleEntity).findBy({
      id: In(body.roleIds),
    });

    const dept = await this.datasource.getRepository(DeptEntity).findOneByOrFail({
      id: body.deptId,
    });

    user.password = body.password;
    user.nickname = body.nickname;
    user.gender = body.gender;
    user.avatar = body.avatar;
    user.qq = body.qq;
    user.email = body.email;
    user.phone = body.phone;
    user.status = body.status;
    user.dept = dept;
    user.roles = roles;
    user.updateBy = operator.username;

    return await this.repo.save(user);
  }

  /**
   * 获取工号
   */
  async getUserNo() {

    const [user] = await this.repo.find({
      order: {
        userNo: 'DESC',
      },
      take: 1,
    });
    const n = user?.userNo || '000';

    const newUserNo = padStart((Number(n) + 1).toString(), 3, '0');

    return newUserNo;
  }

  /**
   * 重置用户密码
   * @param id
   * @param password
   */
  async resetPassword(id: number, password: string, operator: UserDto) {
    return this.repo.update(id, {
      password,
      updateBy: operator.username,
    });
  }


}
