import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(CACHE_MANAGER) private readonly redisClient: RedisClientType,
  ) {}

  async getKey(key: string): Promise<string | null> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      throw new Error(error.name);
    }
  }

  async getHash(key: string, subKey: string): Promise<string> {
    // try {
    //   return new Promise((resolve, reject) => {
    //     this.redisClient.hGet(
    //       key,
    //       subKey,
    //       (err: Error | null, result: string) => {
    //         if (err) reject(err);
    //         resolve(result);
    //       },
    //     );
    //   });
    // } catch (error) {
    //   throw new Error(error.name);
    // }
    return this.redisClient.hGet(key, subKey);
  }

  async setHash(key: string, subKey: string, data: string): Promise<number> {
    // try {
    //   return new Promise((resolve, reject) => {
    //     this.redisClient.hset(
    //       key,
    //       subKey,
    //       data,
    //       (err: Error | null, result: number) => {
    //         if (err) reject(err);
    //         resolve(result);
    //       },
    //     );
    //   });
    // } catch (error) {
    //   throw new Error(error.name);
    // }
    return await this.redisClient.hSet(key, subKey, data);
  }
}
