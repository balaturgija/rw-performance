import { CacheManagerOptions } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
// import Redis from 'ioredis';
import Redis, { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
    //@Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async getKey(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async setKey(key: string, data: any): Promise<string> {
    return await this.redisClient.set(key, data, { EX: 30 });
  }

  async getHash(key: string, subKey: string): Promise<string> {
    // return this.redisClient.hget(key, subKey);
    return await this.redisClient.hGet(key, subKey);
  }

  async setHash(key: string, subKey: string, data: any): Promise<number> {
    // return await this.redisClient.hsetnx(key, subKey, data);
    return await this.redisClient.hSet(key, subKey, data);
  }

  async paginateCollection(key: string, pageSize: number, pageIndex: number) {
    return await this.redisClient.zRange(key, pageSize, pageIndex);
  }
}
