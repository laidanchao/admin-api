import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { DeptTreeDto } from '@/modules/sys/dept/dept.dto';

@Injectable()
export class DeptService extends TypeOrmCrudService<DeptEntity> {
  constructor(
    @InjectRepository(DeptEntity)
    public readonly repo: Repository<DeptEntity>,
  ) {
    super(repo);
  }


  async getAll() {
    const rootDepts = await this.repo.find({
      where:{
        parent: IsNull()
      },
      relations:['children']
    });

    const tree = this.buildTree(rootDepts);
    return tree;
  }
  /*
   [
        {
            "value": "1",
            "label": "有来技术",
            "children": [
                {
                    "value": "2",
                    "label": "研发部门"
                },
                {
                    "value": "3",
                    "label": "测试部门"
                }
            ]
        }
    ]
   */
  // private async buildTree(depts:DeptEntity[],parentId=null): Promise<DeptTreeDto[]>{
  //   const tree = [];
  //   for (const dept of depts) {
  //     if(dept.parentId)
  //   }
  // }

  private buildTree(depts: DeptEntity[]): any[] {
    return depts.map((dept) => ({
      value: dept.id,
      label: dept.name,
      children: dept.children ? this.buildTree(dept.children) : null,
    }));
  }

}
