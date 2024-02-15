import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { DatabaseModule } from './database/database.module';
import { OrderTransactionsModule } from './order-transactions/order-transactions.module';
import { OrdersModule } from './orders/orders.module';
import { RedisModule } from './redis/redis.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    RedisModule,
    DatabaseModule,
    StocksModule,
    OrdersModule,
    OrderTransactionsModule,
  ],
})
export class AppModule {}
