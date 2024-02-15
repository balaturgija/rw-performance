import { Module } from '@nestjs/common';

import { TransactionsRepository } from './order-transactions.repository';
import { OrderTransactionsService } from './order-transactions.service';

@Module({
  providers: [OrderTransactionsService, TransactionsRepository],
  exports: [OrderTransactionsService],
})
export class OrderTransactionsModule {}
