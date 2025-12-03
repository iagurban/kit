import Redis from 'ioredis-mock';

import { AnyAnyFunction } from '../core/index';
import {
  getRedisHashToJSON,
  getRedisHashToJSONByFields,
  getRedisHashToValuesByFields,
  putJSONToRedisHash,
  stringifyJsObjectToRedisHash,
} from './redis-helpers';

type Any = ReturnType<AnyAnyFunction>;

const createInstance = () => new Redis();

describe('redis-helpers', () => {
  let redis: ReturnType<typeof createInstance>;

  beforeEach(() => {
    redis = createInstance();
  });

  afterEach(() => {
    redis.disconnect();
  });

  describe('stringifyJsObjectToRedisHash', () => {
    it('should stringify all values of a JSON object', () => {
      const data = {
        a: 'hello',
        b: 123,
        c: true,
        d: { nested: 'object' },
        e: [1, 2, 3],
        f: null,
      };
      const result = stringifyJsObjectToRedisHash(data);
      expect(result).toEqual({
        a: '"hello"',
        b: '123',
        c: 'true',
        d: '{"nested":"object"}',
        e: '[1,2,3]',
        f: 'null',
      });
    });

    it('should ignore undefined values', () => {
      const data = { a: 1, b: undefined, c: 'hello' };
      const result = stringifyJsObjectToRedisHash(data as Any);
      expect(result).toEqual({
        a: '1',
        c: '"hello"',
      });
    });

    it('should not include properties from the prototype chain', () => {
      const proto = { inherited: 'should-be-ignored' };
      const instance = Object.create(proto);
      instance.own = 'should-be-included';

      const result = stringifyJsObjectToRedisHash(instance);
      expect(result).toEqual({
        own: '"should-be-included"',
      });
    });
  });

  describe('putJSONToRedisHash', () => {
    it('should store an object in a Redis hash', async () => {
      const key = 'my-hash';
      const data = { name: 'John Doe', age: 30 };
      await putJSONToRedisHash(redis, key, data);

      const storedData = await redis.hgetall(key);
      expect(storedData).toEqual({
        name: '"John Doe"',
        age: '30',
      });
    });

    it('should set a TTL on the hash if provided', async () => {
      const key = 'my-hash-with-ttl';
      const data = { message: 'This will expire' };
      const ttl = 60;
      await putJSONToRedisHash(redis, key, data, { ttl });

      const storedData = await redis.hgetall(key);
      expect(storedData).toEqual({
        message: '"This will expire"',
      });

      const keyTtl = await redis.ttl(key);
      expect(keyTtl).toBe(ttl);
    });

    it('should store an empty object', async () => {
      const key = 'empty-object-hash';
      const data = {};
      await putJSONToRedisHash(redis, key, data);

      const storedData = await redis.hgetall(key);
      expect(storedData).toEqual({});
    });

    it('should not set an expiry for a zero or negative TTL', async () => {
      const key1 = 'my-hash-zero-ttl';
      const key2 = 'my-hash-negative-ttl';
      const data = { message: 'This will not expire' };

      await putJSONToRedisHash(redis, key1, data, { ttl: 0 });
      const ttl1 = await redis.ttl(key1);
      expect(ttl1).toBe(-1); // -1 means no expiry

      await putJSONToRedisHash(redis, key2, data, { ttl: -10 });
      const ttl2 = await redis.ttl(key2);
      expect(ttl2).toBe(-1);
    });

    it('should not store fields with undefined values', async () => {
      const key = 'undefined-value-hash';
      const data = { a: 1, b: undefined, c: 'test' };
      await putJSONToRedisHash(redis, key, data as Any);

      const storedData = await redis.hgetall(key);
      expect(storedData).toEqual({
        a: '1',
        c: '"test"',
      });
    });
  });

  describe('getRedisHashToJSON', () => {
    const key = 'test-hash';
    const data = {
      name: 'Jane Doe',
      score: 99.5,
      isAdmin: false,
      items: ['one', 'two'],
      meta: { verified: true },
      nothing: null,
    };

    beforeEach(async () => {
      await redis.hset(key, stringifyJsObjectToRedisHash(data));
    });

    it('should retrieve a hash and parse its JSON values', async () => {
      const result = await getRedisHashToJSON(redis, key);
      expect(result).toEqual(data);
    });

    it('should return null if the hash does not exist', async () => {
      const result = await getRedisHashToJSON(redis, 'non-existent-key');
      expect(result).toBeNull();
    });

    it('should return null if the hash is empty', async () => {
      const emptyKey = 'empty-hash';
      // In ioredis-mock, an empty hset does not create a key.
      // We can create a key with a field and then remove it.
      await redis.hset(emptyKey, 'field', 'value');
      await redis.hdel(emptyKey, 'field');
      const result = await getRedisHashToJSON(redis, emptyKey);
      expect(result).toBeNull();
    });

    it('should use a fallback for invalid JSON values', async () => {
      await redis.hset(key, 'score', 'not-a-number');
      const fallback = jest.fn((stringValue, field) => {
        expect(field).toBe('score');
        return `fallback for ${stringValue}`;
      });

      const result = await getRedisHashToJSON(redis, key, { fallback });
      expect(result).toEqual({
        ...data,
        score: 'fallback for not-a-number',
      });
      expect(fallback).toHaveBeenCalledWith('not-a-number', 'score', expect.any(Error));
    });

    it('should handle non-JSON string values gracefully', async () => {
      // This value is a valid string but not a valid JSON literal for a string
      await redis.hset(key, 'name', 'Just a plain string');
      const result = await getRedisHashToJSON(redis, key);
      expect(result).toEqual({
        ...data,
        name: 'Just a plain string', // safeParseJSONValue should return the original string
      });
    });
  });

  describe('getRedisHashToValuesByFields', () => {
    const key = 'values-hash';
    const data = {
      a: 1,
      b: 'two',
      c: { three: 3 },
    };

    beforeEach(async () => {
      await redis.hset(key, stringifyJsObjectToRedisHash(data));
    });

    it('should retrieve and parse values for specified fields', async () => {
      const fields = ['a', 'c'];
      const result = await getRedisHashToValuesByFields(redis, key, fields);
      expect(result).toEqual([1, { three: 3 }]);
    });

    it('should return an empty array when fields array is empty', async () => {
      const result = await getRedisHashToValuesByFields(redis, key, []);
      expect(result).toEqual([]);
    });

    it('should return null for non-existent fields', async () => {
      const fields = ['a', 'd', 'b'];
      const result = await getRedisHashToValuesByFields(redis, key, fields);
      expect(result).toEqual([1, null, 'two']);
    });

    it('should use a fallback for invalid JSON values', async () => {
      await redis.hset(key, 'b', '{invalid-json');
      const fallback = jest.fn(() => 'fallback');
      const fields = ['a', 'b'];
      const result = await getRedisHashToValuesByFields(redis, key, fields, { fallback });
      expect(result).toEqual([1, 'fallback']);
      expect(fallback).toHaveBeenCalledWith('{invalid-json', 'b', expect.any(Error));
    });
  });

  describe('getRedisHashToJSONByFields', () => {
    const key = 'json-by-fields-hash';
    const data = {
      a: 1,
      b: 'two',
      c: { three: 3 },
    };

    beforeEach(async () => {
      await redis.hset(key, stringifyJsObjectToRedisHash(data));
    });

    it('should retrieve specified fields and return a JSON object', async () => {
      const fields = ['a', 'c'];
      const result = await getRedisHashToJSONByFields(redis, key, fields);
      expect(result).toEqual({ a: 1, c: { three: 3 } });
    });

    it('should return an empty object when fields array is empty', async () => {
      const result = await getRedisHashToJSONByFields(redis, key, []);
      expect(result).toEqual({});
    });

    it('should ignore non-existent fields', async () => {
      const fields = ['a', 'd', 'b'];
      const result = await getRedisHashToJSONByFields(redis, key, fields);
      expect(result).toEqual({ a: 1, b: 'two' });
    });

    it('should return an empty object if no fields are found', async () => {
      const fields = ['d', 'e'];
      const result = await getRedisHashToJSONByFields(redis, key, fields);
      expect(result).toEqual({});
    });

    it('should use a fallback for invalid JSON values', async () => {
      await redis.hset(key, 'b', '{invalid-json');
      const fallback = jest.fn(() => 'fallback');
      const fields = ['a', 'b'];
      const result = await getRedisHashToJSONByFields(redis, key, fields, { fallback });
      expect(result).toEqual({ a: 1, b: 'fallback' });
      expect(fallback).toHaveBeenCalledWith('{invalid-json', 'b', expect.any(Error));
    });
  });
});
