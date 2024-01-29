import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestQueryException extends HttpException {
  constructor(message: string[]) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
