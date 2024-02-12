import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { SortDirection } from 'src/common/types/sort-direction';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';

import { OrderCreateDto } from './dto/order-create.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './types/order-status';
import { OrderType } from './types/order-type';

@Injectable()
export class OrdersRepository {
  async create(
    orderCreateDto: OrderCreateDto,
    status: OrderStatus = OrderStatus.Pending,
  ) {
    return await OrderEntity.create({ ...orderCreateDto, status });
  }

  async findHighestBuyOrder() {
    return await OrderEntity.findOne({
      where: { type: OrderType.Buy, status: OrderStatus.Pending },
      order: [
        ['price', SortDirection.Desc],
        ['createdAt', SortDirection.Asc],
      ],
      //test this
      include: [{ model: TransactionEntity, as: 'transactions' }],
    });
  }

  async findLowestSellOrder() {
    return await OrderEntity.findOne({
      where: { type: OrderType.Sell, status: OrderStatus.Pending },
      order: [
        ['price', SortDirection.Asc],
        ['createdAt', SortDirection.Asc],
      ],
      //test this
      include: [{ model: TransactionEntity, as: 'transactions' }],
    });
  }

  async updateStatus(id: string, status: OrderStatus, t?: Transaction) {
    return await OrderEntity.update(
      { status },
      { where: { id }, transaction: t },
    );
  }
}
