import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Order } from 'src/orders/models/order.model';

import { OrderTransactionCreate } from './models/order-transaction-create.model';
import { TransactionsRepository } from './order-transactions.repository';

@Injectable()
export class OrderTransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async createFromMatchingOrders(
    highestBuyOrder: Order,
    lowestSellOrder: Order,
    t?: Transaction,
  ) {
    const transactionCreate = new OrderTransactionCreate(
      highestBuyOrder,
      lowestSellOrder,
    );
    return await this.transactionsRepository.create(transactionCreate, t);
  }
}
