import { HttpException, HttpStatus } from '@nestjs/common';

export class PokemonNotFoundException extends HttpException {
  constructor(message = 'Pokemon not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
