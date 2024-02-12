import { Inject, Injectable } from '@nestjs/common';
// import { Interval } from '@nestjs/schedule';
import { Sequelize, Transaction } from 'sequelize';
import { TransactionsService } from 'src/transactions/entities/transactions.service';

import { Order } from '../models/order.model';
import { OrdersService } from './orders.service';

@Injectable()
export class MatchOrdersService {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    private readonly transactionsService: TransactionsService,
  ) {}

  // @Interval(10)
  async matchOrders() {
    const buyOrder = await this.ordersService.findHighestBuyOrder();
    const sellOrder = await this.ordersService.findLowestSellOrder();

    // need handle for transaction because we are not updating quantity amount on order, instead we use trasnactions
    if (this.isMatchInPrice(buyOrder, sellOrder)) {
      const transaction = await this.sequelize.transaction();

      try {
        await this.transactionsService.createFromMatchingOrders(
          buyOrder,
          sellOrder,
          transaction,
        );

        await this.closeOrders(buyOrder, sellOrder, transaction);
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
      }
    }
  }

  async isMatchInPrice(highestBuyOrder: Order, lowestSellOrder: Order) {
    if (highestBuyOrder.price === lowestSellOrder.price) {
      return true;
    }

    return false;
  }

  async closeOrders(buyOrder: Order, sellOrder: Order, t?: Transaction) {
    if (buyOrder.quantity !== sellOrder.quantity) {
      if (buyOrder.quantity > sellOrder.quantity) {
        await this.ordersService.closeOrder(sellOrder.id, t);
      }

      await this.ordersService.closeOrder(buyOrder.id, t);
    }

    await this.ordersService.closeOrders([buyOrder.id, sellOrder.id], t);
  }
}
