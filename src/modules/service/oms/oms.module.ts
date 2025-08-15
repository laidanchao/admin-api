import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrderModule],
  exports: [OrderModule],
})
export class OmsModule {
}
