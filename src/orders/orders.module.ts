import { Module } from '@nestjs/common';
import { TransactionsModule } from 'src/transactions/transactions.module';

import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { MatchOrdersService } from './services/match-order.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [TransactionsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, MatchOrdersService],
})
export class OrdersModule {}
