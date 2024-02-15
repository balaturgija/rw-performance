import { Module } from '@nestjs/common';
import { OrderTransactionsModule } from 'src/order-transactions/order-transactions.module';

import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { MatchOrdersService } from './services/match-order.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [OrderTransactionsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, MatchOrdersService],
})
export class OrdersModule {}
