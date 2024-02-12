import { Injectable } from '@nestjs/common';

import { OrderCreateDto } from '../dto/order-create.dto';
import { OrdersRepository } from '../orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async orderCreate(orderCreateDto: OrderCreateDto) {
    try {
      return await this.ordersRepository.create(orderCreateDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
