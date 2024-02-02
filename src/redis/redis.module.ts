import { Global, Module } from '@nestjs/common';

import { RedisService } from './redis.service';
import { redisProvider } from './redis.provider';

@Global()
@Module({
  providers: [redisProvider, RedisService],
  exports: [redisProvider, RedisService],
})
export class RedisModule {}
