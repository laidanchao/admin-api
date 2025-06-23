import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeptService } from '@/modules/sys/dept/dept.service';
import { AddDeptDto, UpdateDeptDto } from '@/modules/sys/dept/dept.dto';


@Controller('api/sys/dept')
export class DeptController {
  constructor(private readonly service: DeptService) {
  }

  /**
   * 查询完整部门树
   */
  @Get('getFullTree')
  async findFullTree() {
    return await this.service.findFullTree();
  }

  /**
   * 查询指定起始节点的部门树
   */
  @Get('getTree/:id')
  async findTree(@Param('id') id:number) {
    return await this.service.findTree(id);
  }

  /**
   * 查询部门
   * @param id
   */
  @Get(':id')
  async findOne(@Param('id') id:number) {
    return await this.service.repo.findOneBy({id});
  }

  /**
   * 修改部门
   * @param id
   */
  @Put(':id')
  async updateOne(@Param('id') id:number, @Body() body: UpdateDeptDto ) {
    return await this.service.updateOne(id,body);
  }

  /**
   * 添加部门
   * @param body
   */
  @Post()
  async addOne(@Body() body: AddDeptDto) {
    return await this.service.addOne(body);
  }

  /**
   * 删除部门
   * @param body
   */
  @Delete(':id')
  async deleteOne(@Param('id') id:number) {
    return await this.service.repo.delete(id);
  }



}
