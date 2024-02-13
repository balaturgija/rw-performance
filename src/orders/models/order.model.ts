import { Transaction } from 'src/transactions/models/transaction.model';

import { OrderStatus } from '../types/order-status';
import { OrderType } from '../types/order-type';

export interface Order {
  id: string;
  price: number;
  quantity: number;
  type: OrderType;
  status: OrderStatus;
  createdAt?: Date;
  transactions: Transaction[];
}

export class Order {
  constructor(order: Order) {
    this.id = order.id;
    this.price = order.price;
    this.quantity = order.quantity;
    this.type = order.type;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.transactions = order.transactions.map((t) => new Transaction(t));
  }
}
