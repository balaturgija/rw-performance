import { Injectable } from '@nestjs/common';

import { OrderCreateDto } from './dto/order-create.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './types/order-status';

@Injectable()
export class OrdersRepository {
  async create(
    orderCreateDto: OrderCreateDto,
    status: OrderStatus = OrderStatus.Pending,
  ) {
    return await OrderEntity.create({ ...orderCreateDto, status });
  }
}
