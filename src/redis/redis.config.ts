import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { create } from 'cache-manager-redis-store';

export const redisConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = {
      store: create({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        auth_pass: process.env.REDIS_PASSWORD,
        password: process.env.REDIS_PASSWORD,
      }),
    };
    try {
      return store;
    } catch (error) {
      throw new Error(error.name);
    }
  },
};
