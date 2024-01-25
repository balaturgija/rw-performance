import { Global, Module } from '@nestjs/common';
import { redisProvider } from './redis.providers';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  exports: [CacheModule.registerAsync(redisProvider)],
})
export class RedisModule {}
