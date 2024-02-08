import { Inject, Injectable } from '@nestjs/common';
// import Redis from 'ioredis';
import { RedisClientType } from 'redis';

import { REDIS_CLIENT } from './types/redis-client.type';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType,
    //@Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async getKey(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async setKey(
    key: string,
    data: any,
    expirationTime?: number,
  ): Promise<string> {
    return await this.redisClient.set(key, data, { EX: expirationTime });
  }

  async getHash(key: string, subKey: string): Promise<string> {
    // return this.redisClient.hget(key, subKey);
    return await this.redisClient.hGet(key, subKey);
  }

  async setHash(key: string, subKey: string, data: any): Promise<number> {
    // return await this.redisClient.hsetnx(key, subKey, data);
    return await this.redisClient.hSet(key, subKey, data);
  }

  startTransaction() {
    return this.redisClient.multi();
  }

  async customCommand(command: string[]) {
    return await this.redisClient.sendCommand(command);
  }

  async getByName(name: string, key: string) {
    return await this.redisClient.hGet(key, name);
  }
}
