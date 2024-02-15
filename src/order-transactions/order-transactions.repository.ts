import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { TransactionCreateDto } from './dto/transaction-create.dto';
import { OrderTransactionEntity } from './entities/order-transaction.entity';

@Injectable()
export class TransactionsRepository {
  async create(transactionCreateDto: TransactionCreateDto, t?: Transaction) {
    return await OrderTransactionEntity.create(transactionCreateDto, {
      transaction: t,
    });
  }
}
