import { Redis } from 'ioredis';

import { mapOwnEntries } from '../utils/object-utils';
import { JsonObject, JsonValue } from './json-type';

/**
 * Options for Redis Hash conversion.
 */
export type RedisHashOptions = {
  /**
   * Optional function to handle string values that fail JSON.parse.
   * Accepts the problematic string value and must return a JsonValue.
   */
  fallback?: (stringValue: string, field: string, error: unknown) => JsonValue;
};

const parseJSONValue = (
  stringValue: string,
  field: string,
  fallback?: (stringValue: string, field: string, error: unknown) => JsonValue
) => {
  try {
    // Attempt to restore the original type using JSON.parse.
    // e.g., "true" -> true, "123" -> 123, "\"admin\"" -> "admin"
    return JSON.parse(stringValue);
  } catch (error) {
    // Parsing failed, data is potentially corrupt or was incorrectly stored.
    return fallback
      ? fallback(stringValue, field, error) // Use provided custom fallback
      : stringValue; // Default: treat as a literal string
  }
};

/**
 * Retrieves all fields of a Redis Hash, converts the string values back to their
 * native JavaScript types using JSON.parse(), and returns the resulting object.
 *
 * This function assumes values were stored using JSON.stringify() to preserve types.
 *
 * @param redis The Redis client instance.
 * @param key The Redis key of the Hash.
 * @param options Optional configuration, including a fallback function.
 * @returns A JavaScript object with typed values, or null if the hash is empty or not found.
 */
export const getRedisHashToJSON = async (
  redis: Redis,
  key: string,
  options: RedisHashOptions = {}
): Promise<JsonObject | null> => {
  const cachedFields = await redis.hgetall(key);

  if (!cachedFields || Object.keys(cachedFields).length === 0) {
    return null;
  }

  const { fallback } = options;
  return mapOwnEntries(cachedFields, (stringValue, field) => parseJSONValue(stringValue, field, fallback));
};

export const getRedisHashToValuesByFields = async (
  redis: Redis,
  key: string,
  fields: readonly string[],
  options: RedisHashOptions = {}
): Promise<JsonValue[]> => {
  const values = await redis.hmget(key, ...(fields as readonly string[]));

  const { fallback } = options;
  return fields.map((field, idx) => {
    const stringValue = values[idx];
    return stringValue == null ? null : parseJSONValue(stringValue, field, fallback);
  });
};

export const getRedisHashToJSONByFields = async (
  redis: Redis,
  key: string,
  fields: readonly string[],
  options: RedisHashOptions = {}
): Promise<JsonObject | null> => {
  const values = await getRedisHashToValuesByFields(redis, key, fields, options);

  const result: JsonObject = {};

  for (const [idx, field] of fields.entries()) {
    if (values[idx] != null) {
      result[field] = values[idx];
    }
  }

  return result;
};

/**
 * Prepares a JavaScript object for consistent storage in a Redis Hash.
 * All field values are individually JSON.stringified to preserve type information.
 *
 * @param data The JavaScript object (JsonObject) to store.
 * @returns A Record<string, string> where all values are JSON strings.
 */
const stringifyJsObjectToRedisHash = (data: JsonObject): Record<string, string> => {
  const fieldsToStore: Record<string, string> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // CRITICAL: JSON.stringify every value before storage.
      fieldsToStore[key] = JSON.stringify(data[key]);
    }
  }
  return fieldsToStore;
};

/**
 * Stores a JavaScript object into a Redis Hash key, atomically setting the fields
 * and an optional Time-To-Live (TTL) using a pipeline.
 *
 * @param redis The Redis client instance.
 * @param key The Redis key of the Hash to write to.
 * @param object The JavaScript object (JsonObject) to store.
 * @param options Optional configuration, including TTL (in seconds).
 */
export const putJSONToRedisHash = async (
  redis: Redis,
  key: string,
  object: JsonObject,
  options: { ttl?: number } = {}
): Promise<void> => {
  // 1. Convert the JS Object into the required Record<string, string> format.
  const fieldsToStore = stringifyJsObjectToRedisHash(object);

  // 2. Start a Redis pipeline (MULTI/EXEC transaction).
  const pipeline = redis.multi();

  // HSET accepts a key and a flat object/record of fields and values.
  // The implementation of HSET in many Node.js Redis clients allows passing
  // the field-value pairs as a single object, similar to HMSET.
  pipeline.hset(key, fieldsToStore);

  // 3. If a TTL is provided, add the EXPIRE command to the pipeline.
  if (options.ttl !== undefined && options.ttl > 0) {
    // EXPIRE sets the TTL on the entire Hash key.
    pipeline.expire(key, options.ttl);
  }

  // 4. Execute the pipeline atomically.
  await pipeline.exec();
};
