// import { Redis } from 'ioredis';
import { RedisClientType, createClient } from 'redis';

export const redisProviders = [
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
  {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const redis: RedisClientType = createClient({
        url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        password: process.env.REDIS_PASSWORD,
      });
      try {
        return await redis.connect();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
];
