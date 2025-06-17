import { Controller } from '@nestjs/common';
import { MenuService } from '@/modules/sys/menu/menu.service';
import { Crud } from '@dataui/crud';
import { MenuEntity } from '@/modules/sys/menu/menu.entity';
import { AddMenuDto } from '@/modules/sys/menu/menu.dto';

@Crud({
  model: {
    type: MenuEntity,
  },
  dto:{
    create: AddMenuDto
  }
})
@Controller('api/sys/menu')
export class MenuController {
  constructor(private readonly service: MenuService) {
  }
}
