import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, TreeRepository } from 'typeorm';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { AddDeptDto, UpdateDeptDto } from '@/modules/sys/dept/dept.dto';
import Utils from '@/common/utils';
import { UserDto } from '@/common/user.decorator';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    public readonly repo: TreeRepository<DeptEntity>,
  ) {
  }

  /**
   * 查询完整部门树
   */
  async getFullTree() {
    const trees = await this.repo.findTrees();
    return Utils.convertToFrontTreeDto(trees);
  }

  async getDeptList() {
    return this.repo.findTrees();
  }

  /**
   * 查询指定起始节点的部门树
   * @param id
   */
  async getTree(id: number) {
    const dept = await this.repo.findOneByOrFail({ id });
    const tree = await this.repo.findDescendantsTree(dept);
    return Utils.convertToFrontTreeDto([tree]);
  }

  /**
   * 查询指定部门的所有子部门
   * @param id
   */
  async getChildren(id: number) {
    const dept = await this.repo.findOneByOrFail({ id });
    return await this.repo.findDescendants(dept);
  }

  /**
   * 添加部门
   * @param body
   * @param operator
   */
  async addOne(body: AddDeptDto, operator: UserDto) {

    let parent = null;
    if (body.parentId > 0) {
      parent = await this.repo.findOne({
        where: {
          id: body.parentId,
        },
        relations: ['children'],
      });
    }

    const dept = new DeptEntity();
    dept.name = body.name;
    dept.updatedBy = operator.username;
    dept.parent = parent;
    return await this.repo.save(dept);
  }

  async updateOne(id: number, body: UpdateDeptDto, operator: UserDto) {
    let parent = null;
    if (body.parentId) {
      parent = await this.repo.findOne({
        where: {
          id: body.parentId,
        },
        relations: ['children'],
      });
    }

    const dept = new DeptEntity();
    dept.name = body.name;
    dept.updatedBy = operator.username;
    dept.parent = parent;
    return await this.repo.update(id, dept);
  }


  async deleteByIds(ids: number[]) {
    const depts = await this.repo.find({
      where: {
        id: In(ids),
      },
      relations: ['children', 'users'],
    });

    if (depts.some(s => s.children.length > 0)) {
      throw new BadRequestException('该部门下还有子部门');
    }

    if (depts.some(s => s.users.length > 0)) {
      throw new BadRequestException('该部门下还有员工');
    }

    return await this.repo.delete(ids);
  }
}
