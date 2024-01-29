import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { create } from 'cache-manager-redis-store';

export const redisConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = {
      store: create({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      }),
      // ttl: process.env.REDIS_TTL,
    };
    try {
      return store;
    } catch (error) {
      throw new Error(error.name);
    }
  },
};
