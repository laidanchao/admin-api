import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CrudRequest } from '@dataui/crud';
import { ClsService } from 'nestjs-cls';
import { UserDto } from '@/common/user.decorator';

@Injectable()
export class BaseCrudService<T extends ObjectLiteral> extends TypeOrmCrudService<T> {
  @Inject(ClsService)
  private readonly cls: ClsService
  constructor(
    protected readonly repo: Repository<T>,
  ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: T): Promise<T> {
    const user: UserDto = this.cls.get('user');
    if (user?.username) {
      (dto as any).id = req.parsed.paramsFilter[0].value;
      (dto as any).createBy = user.username;
    }
    return super.createOne(req, dto);
  }

  async updateOne(req: CrudRequest, dto: T): Promise<T> {
    const user: UserDto = this.cls.get('user');
    if (user?.username) {
      (dto as any).id = req.parsed.paramsFilter[0].value;
      (dto as any).updateBy = user.username;
    }
    return super.updateOne(req, dto);
  }

  async replaceOne(req: CrudRequest, dto: T): Promise<T> {
    const user: UserDto = this.cls.get('user');
    if (user?.username) {
      (dto as any).id = req.parsed.paramsFilter[0].value;
      (dto as any).updateBy = user.username;
    }
    return super.replaceOne(req, dto);
  }
}