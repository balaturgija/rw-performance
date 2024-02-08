import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { StocksModule } from './stocks/stocks.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    RedisModule,
    DatabaseModule,
    StocksModule,
    OrdersModule,
  ],
})
export class AppModule {}
