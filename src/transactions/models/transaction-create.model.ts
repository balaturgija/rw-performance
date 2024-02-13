import { Order } from 'src/orders/models/order.model';

export interface TransactionCreate {
  quantity: number;
  price: number;
  buyOrderId: string;
  sellOrderId: string;
}

export class TransactionCreate {
  constructor(highestBuyOrder: Order, lowestSellOrder: Order) {
    this.buyOrderId = highestBuyOrder.id;
    this.sellOrderId = lowestSellOrder.id;
    this.price = highestBuyOrder.price;
    if (lowestSellOrder.quantity === highestBuyOrder.quantity) {
      this.quantity = highestBuyOrder.quantity;
    }
    if (lowestSellOrder.quantity < highestBuyOrder.quantity) {
      this.quantity = lowestSellOrder.quantity;
    }
    if (lowestSellOrder.quantity > highestBuyOrder.quantity) {
      this.quantity = highestBuyOrder.quantity;
    }
  }
}
