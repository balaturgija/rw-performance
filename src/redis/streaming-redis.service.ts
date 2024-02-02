import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './types/redis-client.type';

@Injectable()
export class StreamingRedisService implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClient,
  ) {}

  // hangin connections handle
  onModuleDestroy() {
    this.redisClient.quit();
  }
}
