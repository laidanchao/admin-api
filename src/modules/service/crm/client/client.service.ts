import { Injectable } from '@nestjs/common';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import ExcelUtils from '@/common/excel.utils';
import { UserDto } from '@/common/user.decorator';
import { ClientStageDesc, ClientTypeDesc } from '@/common/enums';

@Injectable()
export class ClientService extends BaseCrudService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    public readonly repo: Repository<ClientEntity>,
  ) {
    super(repo);
  }

  async import(file: Express.Multer.File, user: UserDto) {
    const jsonData = ExcelUtils.getJsonData(file.buffer);
    let salerId = null;
    if (!user.roles.includes('ROOT') && user.roles.includes('MANAGER')) {
      salerId = user.userId;
    }

    const successData: ClientEntity[] = [];
    const errorMessageArray = [];

    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i];
      let errorMessage='';
      if (!item['客户名']) {
        errorMessage+='客户名不可为空;';
      }
      if (!item['客户类型']) {
        errorMessage+='客户类型不可为空;';
      }
      if (!item['客户分级']) {
        errorMessage+='客户分级不可为空;';
      }
      if (errorMessage) {
        errorMessageArray.push(`第${i + 1}行,${errorMessage}`);
        continue;
      }
      successData.push(<ClientEntity>{
        clientName: item['客户名'],
        phone: item['手机号'],
        username: item['用户名'],
        password: item['密码'],
        clientType: ClientTypeDesc[item['客户类型']],
        clientStage: ClientStageDesc[item['客户分级']],
        qq: item['QQ'],
        email: item['邮箱'],
        address: item['客户地址'],
        salerId,
        createdBy: user.username,
      });
    }

    await this.repo.save(successData);
    return {
      successCount: successData.length,
      errorCount: errorMessageArray.length,
      errorMessageArray: errorMessageArray,
    };

  }
}
