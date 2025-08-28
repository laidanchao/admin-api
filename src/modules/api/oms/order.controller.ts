import { Controller } from '@nestjs/common';
import { Crud } from '@dataui/crud';
import { OrderEntity } from '@/modules/service/oms/order/order.entity';
import { OrderService } from '@/modules/service/oms/order/order.service';

@Crud({
  model: {
    type: OrderEntity,
  },
  query: {
    join: {},
    sort: [{ field: 'id', order: 'DESC' }],
  },
})
@Controller('oms/order')
export class OrderController {
  constructor(private readonly service: OrderService) {}
}
