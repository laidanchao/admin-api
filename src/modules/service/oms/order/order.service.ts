import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '@/common/base-crud.service';
import { OrderEntity } from '@/modules/service/oms/order/order.entity';

@Injectable()
export class OrderService extends BaseCrudService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    public readonly repo: Repository<OrderEntity>,
  ) {
    super(repo);
  }
}
