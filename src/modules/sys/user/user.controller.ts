import { Controller } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { UserService } from '@/modules/sys/user/user.service';
import { UserEntity } from '@/modules/sys/user/user.entity';

@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('/api/sys/user')
export class UserController {
  constructor(private readonly service: UserService) {
  }
}
