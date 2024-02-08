import { Injectable } from '@nestjs/common';

import { StocksRepository } from './stocks.repository';

@Injectable()
export class StocksService {
  constructor(private readonly stocksRepository: StocksRepository) {}
}
