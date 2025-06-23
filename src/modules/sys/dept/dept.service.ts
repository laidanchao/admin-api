import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { AddDeptDto, DeptTreeDto, UpdateDeptDto } from '@/modules/sys/dept/dept.dto';

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
  async findFullTree() {
    const tree = await this.repo.findTrees();
    return this._convertToTreeDto(tree);
  }

  /**
   * 查询指定起始节点的部门树
   * @param id
   */
  async findTree(id: number) {
    const dept = await this.repo.findOneByOrFail({ id });
    return await this.repo.findDescendantsTree(dept);
  }

  /**
   *
   * @param depts
   * @private
   */
  private _convertToTreeDto(depts: DeptEntity[]): DeptTreeDto[] {
    return depts.map(dept => ({
      value: dept.id.toString(), // 将id转换为字符串
      label: dept.name,
      children: dept.children && dept.children.length > 0
        ? this._convertToTreeDto(dept.children)
        : [],
    }));
  }

  /**
   * 添加部门
   * @param dto
   */
  async addOne(dto: AddDeptDto) {
    const parentDept = await this.repo.findOneOrFail({
      where: {
        id: dto.parentId,
      },
      relations: ['children'],
    });

    const dept = new DeptEntity();
    dept.name = dto.name;
    dept.createBy = 'ldc';
    dept.updateBy = 'ldc';
    dept.parent = parentDept;
    return await this.repo.save(dept);
  }

  async updateOne(id: number, dto: UpdateDeptDto) {
    let parentDept;
    if (dto.parentId) {
      parentDept = await this.repo.findOneOrFail({
        where: {
          id: dto.parentId,
        },
        relations: ['children'],
      });
    }

    const dept = new DeptEntity();
    dept.name = dto.name;
    dept.createBy = 'ldc';
    dept.updateBy = 'ldc';
    dept.parent = parentDept;
    return await this.repo.update(id, dept);
  }


}
