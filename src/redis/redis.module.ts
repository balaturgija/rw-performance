import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { redisConfig } from './redis.config';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [CacheModule.registerAsync(redisConfig)],
  providers: [
    RedisService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
