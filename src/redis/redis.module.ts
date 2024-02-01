import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { RedisService } from './redis.service';
import { redisProviders } from './redis.providers';

@Global()
@Module({
  providers: [...redisProviders, RedisService],
  exports: [...redisProviders, RedisService],
})
export class RedisModule {}
