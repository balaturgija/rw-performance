import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Order } from 'src/orders/models/order.model';

import { TransactionCreate } from '../models/transaction.model';
import { TransactionsRepository } from '../transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async createFromMatchingOrders(
    highestBuyOrder: Order,
    lowestSellOrder: Order,
    t?: Transaction,
  ) {
    const transactionCreate = new TransactionCreate(
      highestBuyOrder,
      lowestSellOrder,
    );
    return await this.transactionsRepository.create(transactionCreate, t);
  }
}
