import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/service/sys/user/user.entity';
import { chain, flatMap, padStart } from 'lodash';
import { MenuEntity } from '@/modules/service/sys/menu/menu.entity';
import { MenuService } from '@/modules/service/sys/menu/menu.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@/modules/service/sys/user/user.dto';
import { RoleEntity } from '@/modules/service/sys/role/role.entity';
import { DeptEntity } from '@/modules/service/sys/dept/dept.entity';
import { UserDto } from '@/common/user.decorator';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MenuTreeNode } from '@/modules/service/sys/menu/menu.dto';
import { MenuType } from '@/common/enums';
import { aesEncrypt } from '@/common/crypt';
import { FileService } from '@/modules/service/file/file.service';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public readonly repo: Repository<UserEntity>,
    private datasource: DataSource,
    private readonly menuService: MenuService,
    private readonly fileService: FileService,
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
    const menuList = menus.filter((f) => allowTypes.includes(f.type));
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
      relations: ['dept', 'roles'],
    });

    const menus = await this.getMenusByUserId(id);

    const buttons = menus.filter((f) => f.type === MenuType.BUTTON);
    return {
      ...user,
      permissions: buttons.map((m) => m.permission),
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
      roleIds: user.roles.map((m) => m.id),
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

    const dept = await this.datasource
      .getRepository(DeptEntity)
      .findOneByOrFail({
        id: body.deptId,
      });

    return await this.repo.save({
      username: body.username,
      password: aesEncrypt(body.password),
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
      createdBy: operator.username,
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

    const dept = await this.datasource
      .getRepository(DeptEntity)
      .findOneByOrFail({
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
    user.updatedBy = operator.username;

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
      password: aesEncrypt(password),
      updatedBy: operator.username,
    });
  }

  /**
   * 修改用户密码
   * @param id
   * @param oldPassword
   * @param newPassword
   * @param confirmPassword
   */
  async changePassword(
    id: number,
    { oldPassword, newPassword, confirmPassword },
  ) {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('两次输入密码不一致');
    }
    const user = await this.repo.findOneOrFail({
      where: {
        id,
      },
      select: ['password'],
    });

    if (user.password !== aesEncrypt(oldPassword)) {
      throw new BadRequestException('旧密码有误');
    }

    return this.repo.update(id, {
      password: aesEncrypt(newPassword),
      updatedBy: user.username,
    });
  }

  async updateAvatar(id: number, avatar: string) {
    const user = await this.repo.findOneByOrFail({ id });

    await this.repo.update(id, {
      avatar,
    });

    // 删除旧头像
    if (user.avatar) {
      const key = user.avatar
        .split('?')[0]
        .replace(process.env.QINIU_DOMAIN + '/', '');
      await this.fileService.deleteFile(key);
    }
  }

  async getSalers() {
    const roles = await this.datasource.getRepository(RoleEntity).find({
      where: {
        code: Like(`SALE%`),
      },
      relations: ['users'],
    });

    return flatMap(roles, 'users').map((m) => {
      return {
        id: m.id,
        username: m.username,
        nickname: m.nickname,
      };
    });
  }
}
