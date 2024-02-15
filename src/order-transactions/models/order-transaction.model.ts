export interface OrderTransaction {
  id: string;
  quantity: number;
  price: number;
  buyOrderId: string;
  sellOrderId: string;
  createdAt?: Date;
}

export class OrderTransaction {
  constructor(transaction: OrderTransaction) {
    this.id = transaction.id;
    this.quantity = transaction.quantity;
    this.price = transaction.price;
    this.buyOrderId = transaction.buyOrderId;
    this.sellOrderId = transaction.sellOrderId;
  }
}
