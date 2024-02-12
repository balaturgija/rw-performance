import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { TransactionCreateDto } from './dto/transaction-create.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionsRepository {
  async create(transactionCreateDto: TransactionCreateDto, t?: Transaction) {
    return await TransactionEntity.create(transactionCreateDto, {
      transaction: t,
    });
  }
}
