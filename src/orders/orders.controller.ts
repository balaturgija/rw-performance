import { Body, Controller, Post } from '@nestjs/common';

import { OrderCreateDto } from './dto/order-create.dto';
import { OrdersService } from './services/orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async orderCreate(@Body() orderCreateDto: OrderCreateDto) {
    return await this.ordersService.orderCreate(orderCreateDto);
  }
}
