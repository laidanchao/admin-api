import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientService } from '@/modules/service/crm/client/client.service';
import { ClientEntity } from '@/modules/service/crm/client/client.entity';
import { Crud } from '@dataui/crud';
import { CrudAcl } from '@/common/crud-acl.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { User, UserDto } from '@/common/user.decorator';

@Crud({
  model: {
    type: ClientEntity,
  },
  query: {
    join: {
      saler: {
        eager: true,
      },
    },
    sort: [{ field: 'id', order: 'DESC' }],
  },
})
@CrudAcl('salerId')
@Controller('crm/client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(xls|xlsx|csv)$/)) {
          return callback(new BadRequestException('只允许excel文件'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  )
  async import(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserDto,
  ) {
    return this.service.import(file, user);
  }
}
