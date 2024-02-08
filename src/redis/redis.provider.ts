// import { Redis } from 'ioredis';
import { FactoryProvider } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

import { REDIS_CLIENT, RedisClient } from './types/redis-client.type';

export const redisProvider: FactoryProvider<Promise<RedisClient>> = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const redisClient: RedisClientType = createClient({
      url: `${process.env.REDIS_PROTOCOL}://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    try {
      await redisClient.connect();
      return redisClient;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

// {
//   provide: 'REDIS_CLIENT',
//   useFactory: async () => {
//     const redis = new Redis({
//       host: process.env.REDIS_HOST,
//       port: Number(process.env.REDIS_PORT),
//       password: process.env.REDIS_PASSWORD,
//     });

//     try {
//       const connect = await redis.ping();
//       if (connect === 'PONG') return redis;
//     } catch (error) {
//       throw new Error(error.name);
//     }
//   },
// },
