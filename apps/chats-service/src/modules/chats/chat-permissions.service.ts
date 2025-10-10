import { once } from '@gurban/kit/core/once';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { mapOwnEntries } from '@gurban/kit/utils/object-utils';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from '@poslah/database/db/db.service';
import { RedisService } from '@poslah/database/redis/redis.service';
import { JsonObject, JsonValue } from '@poslah/util/json-type';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { Redis } from 'ioredis';

import {
  ChatPermissionsDto,
  chatPermissionsSchema,
  UpdateChatPermissionsDto,
  updateChatPermissionsSchema,
} from './raw-event-schema';

/**
 * Options for Redis Hash conversion.
 */
type RedisHashOptions = {
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
 * Type definition to map an input array of keys (K) to an output tuple of boolean values.
 * K extends the available permission keys from ChatPermissionsDto.
 */
type GetPermissionsByKeysReturn<K extends readonly (keyof ChatPermissionsDto)[]> = {
  [I in keyof K]: boolean;
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

@Injectable()
export class ChatPermissionsService {
  constructor(
    private readonly db: DbService,
    private readonly loggerBase: Logger,
    private readonly redis: RedisService
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatPermissionsService.name);
  }

  private static readonly cacheKey = (chatId: string, userId: string) => `permissions:${chatId}:${userId}`;

  /**
   * Calculates the final, effective permissions for a user in a specific chat.
   * This is the single source of truth for authorization checks.
   * The result of this function is what should be cached in Redis.
   * @returns The merged permissions object, or `true` if the user is the chat owner.
   */
  private async calculateEffectivePermissions(
    chatId: string,
    userId: string
  ): Promise<ChatPermissionsDto | boolean> {
    // --- First, try the most specific query ---
    const userPermsRecord = await this.db.client.userChatPermissions.findUnique({
      where: { userId_chatId: { userId, chatId } },
      select: {
        permissions: true, // Layer 3: The user's overrides
        role: { select: { permissions: true } }, // Layer 2: The user's assigned role
        chat: { select: { ownerId: true } }, // Also get ownerId here
      },
    });

    if (userPermsRecord) {
      // Owner check is the highest priority
      if (userPermsRecord.chat.ownerId === userId) {
        return true;
      }

      // Since we have the user's record, we still need the chat's default role as a fallback.
      // This is a second, but very fast, query.
      const defaultRoleRecord = await this.db.client.chat.findUniqueOrThrow({
        where: { id: chatId },
        select: { defaultRole: { select: { permissions: true } } },
      });

      const defaultRolePerms = (defaultRoleRecord.defaultRole?.permissions ||
        {}) as Partial<UpdateChatPermissionsDto>;
      const assignedRolePerms = (userPermsRecord.role?.permissions ||
        {}) as Partial<UpdateChatPermissionsDto>;
      const userOverridePerms = (userPermsRecord.permissions || {}) as Partial<UpdateChatPermissionsDto>;

      const effectivePermissions = {
        ...defaultRolePerms,
        ...assignedRolePerms,
        ...userOverridePerms,
        changeOwner: false,
      };

      return chatPermissionsSchema.parse(effectivePermissions);
    }

    // User has NO specific permissions record ---
    // Perform the fallback query to get chat-level info.
    const chat = await this.db.client.chat.findUnique({
      where: { id: chatId },
      select: {
        ownerId: true,
        defaultRole: { select: { permissions: true } },
      },
    });

    if (!chat) {
      return false;
    }

    if (chat.ownerId === userId) {
      return true;
    }

    // If not the owner, their permissions are simply the default role's permissions.
    const effectivePermissions = (chat.defaultRole?.permissions || {}) as Partial<ChatPermissionsDto>;
    return chatPermissionsSchema.parse(effectivePermissions);
  }

  private async updatePermissionCache(chatId: string, userId: string): Promise<ChatPermissionsDto> {
    const effectivePermissions = await this.calculateEffectivePermissions(chatId, userId);

    // 4. Store the result in the Redis Hash with a Time-To-Live (TTL).
    if (effectivePermissions !== false) {
      const permissionsToCache =
        effectivePermissions === true ? ChatPermissionsService.ownerPermissions : effectivePermissions;

      const cacheKey = ChatPermissionsService.cacheKey(chatId, userId);
      await putJSONToRedisHash(
        this.redis,
        cacheKey,
        permissionsToCache as JsonObject, // Cast to JsonObject for the utility function
        { ttl: 600 } // 10 minutes
      );
      this.logger.debug(`Cache set (Redis Hash) for permissions: ${cacheKey}`);
      return permissionsToCache;
    }

    throw new ForbiddenException('You do not have permission to perform this action.');
  }

  /**
   * A wrapper around the core calculation logic that introduces a Redis caching layer.
   * All permission checks should call this method.
   */
  private async getCachedEffectivePermissions(
    chatId: string,
    userId: string
  ): Promise<UpdateChatPermissionsDto> {
    // 1. Define a consistent cache key (now a Redis Hash key).
    const cacheKey = ChatPermissionsService.cacheKey(chatId, userId);

    // 2. Try to get the permissions from the Redis Hash.
    const cachedData = await getRedisHashToJSON(this.redis, cacheKey, {
      // Implement the fallback to log the corruption/parsing error
      fallback: (stringValue, error) => {
        this.logger.warn(
          { error, value: stringValue },
          `Cached hash field for ${cacheKey} failed JSON.parse. Falling back to treating as string.`
        );
        // Default behavior: return the raw string value (which Zod will likely reject)
        return stringValue;
      },
    });

    if (cachedData) {
      try {
        // Validation now happens on the object returned by getRedisHashToJSON,
        // which has correctly typed values (booleans, numbers, etc.).
        const validatedPermissions = updateChatPermissionsSchema.parse(cachedData);

        this.logger.debug(`Cache HIT and validation success for permissions: ${cacheKey}`);
        return validatedPermissions;
      } catch (error) {
        // If validation fails (due to corruption, old schema, or parser fallback), we regenerate.
        this.logger.warn(
          { error },
          `Cached permissions for ${cacheKey} are invalid or corrupt. Regenerating...`
        );
        // By continuing, we will fall through to the cache miss logic below.
      }
    }

    this.logger.debug(`Cache MISS for permissions: ${cacheKey}. Calculating...`);
    // 3. If the cache misses, run the original, expensive calculation.
    return this.updatePermissionCache(chatId, userId);
  }

  static readonly ownerPermissions: ChatPermissionsDto = {
    changeOwner: true,
    deleteAllMessages: true,
    editInfo: true,
    deleteOwnMessages: true,
    invite: true,
    joinByInvite: true,
    joinByButton: true,
    kick: true,
    sendMessage: true,
  };

  getPermissions(chatId: string, userId: string): Promise<UpdateChatPermissionsDto> {
    return this.getCachedEffectivePermissions(chatId, userId);
  }

  /**
   * Retrieves specific permissions by key, using the Redis Hash HGET/HMGET command for optimal performance.
   * If any requested permission is missing or corrupt, the full set of permissions is
   * recalculated, the entire Hash is updated, and then the requested permissions are returned.
   *
   * @param chatId The ID of the chat.
   * @param userId The ID of the user.
   * @param keys A tuple/array of permission keys to retrieve.
   * @returns A tuple of boolean values corresponding to the input keys.
   */
  async getPermissionsByKeys<K extends readonly (keyof ChatPermissionsDto)[]>(
    chatId: string,
    userId: string,
    keys: K
  ): Promise<GetPermissionsByKeysReturn<K>> {
    const cacheKey = ChatPermissionsService.cacheKey(chatId, userId);

    // 1. Try to fetch only the required keys from the Redis Hash.
    const cachedData = await getRedisHashToValuesByFields(this.redis, cacheKey, keys, {
      fallback: (stringValue, field, error) => {
        // Log corruption and return null to treat this field as a cache miss/missing key.
        this.logger.warn(
          { error, field, value: stringValue },
          `Hash field corruption detected for ${field}.`
        );
        return null;
      },
    });

    // A full hit means we retrieved the expected number of fields.
    if (cachedData.length === keys.length && cachedData.every(v => v != null)) {
      this.logger.debug(`Cache HIT for all requested permissions in ${cacheKey}.`);
      return cachedData.map(v => !!v) as GetPermissionsByKeysReturn<K>;
    }

    // 2b. Cache MISS/CORRUPTION. Recalculate, update cache, and return requested fields.
    this.logger.debug(`Partial cache MISS/Corruption for ${cacheKey}. Recalculating full permissions.`);

    const effectivePermissions = await this.updatePermissionCache(chatId, userId);
    this.logger.debug(`Cache updated after miss/corruption for ${cacheKey}.`);

    // 4. Extract the specific requested fields from the calculated object and return as the tuple.
    return keys.map(key => notNull(effectivePermissions[key])) as GetPermissionsByKeysReturn<K>;
  }

  async isMemberOfChat(chatId: string, userId: string): Promise<boolean> {
    return (await this.db.transaction.chatMember.findFirstOrThrow({ where: { chatId, userId } })) != null;
  }

  /**
   * Deletes the cached permissions for a specific user in a specific chat.
   */
  public async invalidatePermissionsCache(chatId: string, userId: string): Promise<void> {
    const cacheKey = ChatPermissionsService.cacheKey(chatId, userId);
    await this.redis.del(cacheKey);
  }
}
