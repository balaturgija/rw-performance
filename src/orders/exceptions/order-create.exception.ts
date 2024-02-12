import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderCreateException extends HttpException {
  constructor(message = 'Order create fail') {
    super(message, HttpStatus.CONFLICT);
  }
}
