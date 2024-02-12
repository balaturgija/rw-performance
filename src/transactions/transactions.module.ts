import { Module } from '@nestjs/common';

import { TransactionsService } from './entities/transactions.service';
import { TransactionsRepository } from './transactions.repository';

@Module({
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService],
})
export class TransactionsModule {}
