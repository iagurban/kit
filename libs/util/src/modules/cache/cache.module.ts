import { isString } from '@gurban/kit/core/checks';
import { Errors } from '@gurban/kit/core/errors';
import { JsonObject } from '@gurban/kit/core/json-type';
import {
  getRedisHashToJSON,
  getRedisHashToValuesByFields,
  putJSONToRedisHash,
  RedisHashOptions,
} from '@gurban/kit/core/redis-helpers';
import { Injectable, Module } from '@nestjs/common';

import { RedisStaticModule } from '../../ready-modules/redis-static-module';
import { RedisService } from '../nosql/redis/redis.service';
import { RedisScriptManager } from '../nosql/redis/redis-script-manager';

type Nullable<T> = { [K in keyof T]: T[K] | null };

@Injectable()
export class CacheService {
  constructor(
    private readonly redis: RedisService,
    private readonly scriptManager: RedisScriptManager
  ) {}

  setKey(key: string, value: string, options?: { ttl?: number }) {
    return options?.ttl ? this.redis.set(key, value, 'EX', options.ttl) : this.redis.set(key, value);
  }

  getAndDeleteKey(key: string) {
    return this.redis.getdel(key);
  }

  deleteKey(...keys: string[]) {
    return this.redis.del(...keys);
  }

  getSetMembers(key: string): Promise<string[]> {
    return this.redis.smembers(key);
  }

  addToSet(key: string, ...members: string[]) {
    return this.redis.sadd(key, ...members);
  }

  putObjectToHash(key: string, data: JsonObject, options?: { ttl?: number }) {
    return putJSONToRedisHash(this.redis, key, data, options);
  }

  getHashAsObject(key: string, options?: RedisHashOptions) {
    return getRedisHashToJSON(this.redis, key, options);
  }

  getHashFieldsValues(key: string, fields: readonly string[], options?: RedisHashOptions) {
    return getRedisHashToValuesByFields(this.redis, key, fields, options);
  }

  getAllHashFieldsValues(key: string) {
    return this.redis.hgetall(key);
  }

  delete(key: string) {
    return this.redis.del(key);
  }

  increment(key: string, field: string, amount: number) {
    return this.redis.hincrby(key, field, amount);
  }

  async getManyFieldsValues<O extends Record<string, string>>(request: O): Promise<Nullable<O> | null> {
    const requestKeys = Object.keys(request);

    const pipeline = this.redis.pipeline();
    for (const key of requestKeys) {
      pipeline.hget(key, request[key]);
    }

    const results = await pipeline.exec();
    if (!results) {
      return null;
    }

    const values: Partial<Nullable<O>> = {};
    const errors: Error[] = [];

    for (const [index, key] of requestKeys.entries()) {
      const [error, value] = results[index];
      if (error) {
        errors.push(error);
      } else if (value === null || isString(value)) {
        (values as Record<string, string | null>)[key] = value;
      } else {
        throw new Error(`unexpected return from HGET: ${value}`);
      }
    }

    if (errors.length > 0) {
      throw new Errors(errors);
    }

    return values as Nullable<O>; // casting, since we are surely filled all keys
  }

  async publishSchema({
    subgraph,
    versionsKey,
    subgraphsKey,
    serviceName,
  }: {
    subgraph: { name: string; sdl: string; version: number };
    versionsKey: string;
    subgraphsKey: string;
    serviceName: string;
  }) {
    //  Define keys and args for the Lua script
    const keys = [versionsKey, subgraphsKey];
    const argv = [serviceName, subgraph.version.toString(), JSON.stringify(subgraph)];

    //  Execute the script using EVALSHA for performance
    const result = await this.redis.evalsha(
      this.scriptManager.getSha('publishSchema'),
      keys.length,
      ...keys,
      ...argv
    );

    //  If the script returned 1, it means we updated the schema, so we publish a notification
    return result === 1;
  }
}

@Module({
  imports: [RedisStaticModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
