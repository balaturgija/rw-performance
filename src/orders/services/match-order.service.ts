import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Sequelize, Transaction } from 'sequelize';
import { OrderTransactionsService } from 'src/order-transactions/order-transactions.service';

import { Order } from '../models/order.model';
import { OrdersService } from './orders.service';

@Injectable()
export class MatchOrdersService {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    private readonly orderTransactionsService: OrderTransactionsService,
  ) {}

  // @Interval(2000)
  async matchOrders() {
    // first check cache(not for now)

    // refactor this getOrderBookPair to fetch and cache next orders in line
    const { highestBuyOrder, lowestSellOrder } = await this.getOrderBookPair();

    // need to handle transactions because we're not updating the quantity directly on the order; instead, we use transactions.
    if (this.isMatchInPrice(highestBuyOrder, lowestSellOrder)) {
      const transaction = await this.sequelize.transaction();

      try {
        // create transaction
        const { quantity: transactionQuantity } =
          await this.orderTransactionsService.createFromMatchingOrders(
            highestBuyOrder,
            lowestSellOrder,
            transaction,
          );

        // close orders
        await this.closeOrders(
          transactionQuantity,
          highestBuyOrder,
          lowestSellOrder,
          transaction,
        );
        // exchange coins
        // notify users
        await transaction.commit();
      } catch (error) {
        await transaction.rollback();
      }
    }
  }

  async getOrderBookPair(): Promise<{
    highestBuyOrder: Order;
    lowestSellOrder: Order;
  }> {
    const highestBuyOrder = await this.ordersService.findHighestBuyOrder();
    const lowestSellOrder = await this.ordersService.findLowestSellOrder();

    if (highestBuyOrder.transactions.length)
      highestBuyOrder.quantity =
        this.calculateRemainingQuantity(highestBuyOrder);

    if (lowestSellOrder.transactions.length)
      lowestSellOrder.quantity =
        this.calculateRemainingQuantity(lowestSellOrder);

    return { highestBuyOrder, lowestSellOrder };
  }

  async isMatchInPrice(highestBuyOrder: Order, lowestSellOrder: Order) {
    if (highestBuyOrder.price === lowestSellOrder.price) {
      return true;
    }

    return false;
  }

  calculateRemainingQuantity(order: Order): number {
    return (
      order.quantity -
      order.transactions.reduce((acc, t) => acc + t.quantity, 0)
    );
  }

  async closeOrders(
    transactionQuantity: number,
    buyOrder: Order,
    sellOrder: Order,
    t?: Transaction,
  ) {
    if (buyOrder.quantity === sellOrder.quantity) {
      return await this.ordersService.closeOrders(
        [buyOrder.id, sellOrder.id],
        t,
      );
    } else {
      if (transactionQuantity === buyOrder.quantity) {
        await this.ordersService.closeOrder(buyOrder.id, t);
      }

      if (transactionQuantity === sellOrder.quantity) {
        await this.ordersService.closeOrder(sellOrder.id, t);
      }
    }
  }
}
