import { Body, Controller, Get, Post } from '@nestjs/common';

import { OrderCreateDto } from './dto/order-create.dto';
import { OrdersService } from './services/orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('sellOrdrBook')
  async getSellOrderBook() {
    return await this.ordersService.createSellOrderBook();
  }

  @Get('buyOrderBook')
  async getBuyOrderBook() {
    return await this.ordersService.createBuyOrderBook();
  }

  @Post()
  async orderCreate(@Body() orderCreateDto: OrderCreateDto) {
    return await this.ordersService.orderCreate(orderCreateDto);
  }
}
