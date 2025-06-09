import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeptService } from '@/modules/sys/dept/dept.service';
import { DeptEntity } from '@/modules/sys/dept/dept.entity';
import { Crud, CrudRequest, Override } from '@dataui/crud';
import { DeepPartial } from 'typeorm';

@Crud({
  model: {
    type: DeptEntity,
  },
})
@Controller('api/sys/dept')
export class DeptController {
  constructor(private readonly service: DeptService) {
  }

  @Post('createOne')
  async createOne(@Body() body:{parentId:number,name:string}){
    const parentDept = await this.service.findOne({
      where:{
        id:body.parentId
      },
      relations:['children']
    });

    const dept= new DeptEntity();
    dept.name=body.name;
    dept.createBy= 'ldc';
    dept.updateBy= 'ldc';

    if(parentDept){
      dept.parent=parentDept;
    }

    await this.service.repo.save(dept);
  }





  @Get('getAll')
  async getAllDept(){
    return await this.service.getAll();
  }
}
