import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderCreateException } from '../exceptions/order-create.exception';
import { Order } from '../models/order.model';
import { OrdersRepository } from '../orders.repository';
import { OrderStatus } from '../types/order-status';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async findHighestBuyOrder() {
    const order = await this.ordersRepository.findHighestBuyOrder();
    return new Order(order);
  }

  async findLowestSellOrder() {
    const order = await this.ordersRepository.findLowestSellOrder();
    return new Order(order);
  }

  async orderCreate(orderCreateDto: OrderCreateDto) {
    try {
      await this.ordersRepository.create(orderCreateDto);
      const result = await this.findLowestSellOrder();
      return result;
    } catch (error) {
      throw new OrderCreateException();
    }
  }

  async closeOrder(orderId: string, t?: Transaction) {
    return await this.ordersRepository.updateStatus(
      orderId,
      OrderStatus.Completed,
      t,
    );
  }

  async closeOrders(orderIds: string[], t?: Transaction) {
    const result = orderIds.map((orderId) =>
      this.ordersRepository.updateStatus(orderId, OrderStatus.Completed, t),
    );

    return await Promise.all(result);
  }
}
