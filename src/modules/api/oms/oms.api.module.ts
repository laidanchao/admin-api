import { Module } from '@nestjs/common';
import { OrderController } from '@/modules/api/oms/order.controller';
import { OmsModule } from '@/modules/service/oms/oms.module';

@Module({
  imports: [OmsModule],
  controllers: [OrderController],
})
export class OmsApiModule {
}