import { Module } from '@nestjs/common';

import { StocksRepository } from './stocks.repository';
import { StocksService } from './stocks.service';

@Module({
  providers: [StocksService, StocksRepository],
})
export class StocksModule {}
