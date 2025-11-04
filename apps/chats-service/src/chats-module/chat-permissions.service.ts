import { isTruthy } from '@gurban/kit/core/checks';
import { JsonObject } from '@gurban/kit/core/json-type';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CacheService } from '@poslah/util/modules/cache/cache.module';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import {
  ChatPermissionsDto,
  chatPermissionsSchema,
  UpdateChatPermissionsDto,
  updateChatPermissionsSchema,
} from '@poslah/util/schemas/chat-permissions-schema';

import { ChatsRepository } from './chats.repository';

/**
 * Type definition to map an input array of keys (K) to an output tuple of boolean values.
 * K extends the available permission keys from ChatPermissionsDto.
 */
type GetPermissionsByKeysReturn<K extends readonly (keyof ChatPermissionsDto)[]> = {
  [I in keyof K]: boolean;
};

@Injectable()
export class ChatPermissionsService {
  constructor(
    private readonly repository: ChatsRepository,
    private readonly loggerBase: Logger,
    private readonly cache: CacheService
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
    const userPermissions = await this.repository.getUserChatPermissions(chatId, userId, {
      role: { select: { permissions: true } }, // The user's assigned role
      permissions: true, // The user's overrides
      chat: {
        select: {
          defaultRole: { select: { permissions: true } },
          ownerId: true,
        },
      },
    });

    const {
      defaultRole,
      ownerId,
    } = // even if userPermissions is null, we still need defaultRole and ownerId
      userPermissions?.chat ||
      (await this.repository.getUniqueChat(chatId, {
        defaultRole: { select: { permissions: true } },
        ownerId: true,
      })) ||
      {};

    if (ownerId == null) {
      return false;
    }

    if (ownerId === userId) {
      return true;
    }

    return chatPermissionsSchema.parse({
      ...(defaultRole?.permissions || {}),
      ...(userPermissions?.role?.permissions || {}),
      ...(userPermissions?.permissions || {}),
      changeOwner: false,
    });
  }

  private async updatePermissionCache(
    chatId: string,
    userId: string,
    cacheKey: string
  ): Promise<ChatPermissionsDto> {
    const effectivePermissions = await this.calculateEffectivePermissions(chatId, userId);

    // 4. Store the result in the Redis Hash with a Time-To-Live (TTL).
    if (effectivePermissions !== false) {
      const permissionsToCache =
        effectivePermissions === true ? ChatPermissionsService.ownerPermissions : effectivePermissions;

      await this.cache.putObjectToHash(
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
    const cachedData = await this.cache.getHashAsObject(cacheKey, {
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
    return this.updatePermissionCache(chatId, userId, cacheKey);
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
    const cachedData = await this.cache.getHashFieldsValues(cacheKey, keys, {
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
      return cachedData.map(isTruthy) as GetPermissionsByKeysReturn<K>;
    }

    // 2b. Cache MISS/CORRUPTION. Recalculate, update cache, and return requested fields.
    this.logger.debug(`Partial cache MISS/Corruption for ${cacheKey}. Recalculating full permissions.`);

    const effectivePermissions = await this.updatePermissionCache(chatId, userId, cacheKey);
    this.logger.debug(`Cache updated after miss/corruption for ${cacheKey}.`);

    // 4. Extract the specific requested fields from the calculated object and return as the tuple.
    return keys.map(key => notNull(effectivePermissions[key])) as GetPermissionsByKeysReturn<K>;
  }

  async isMemberOfChat(chatId: string, userId: string): Promise<boolean> {
    return (await this.repository.getUniqueChatMember(chatId, userId)) != null;
  }

  /**
   * Deletes the cached permissions for a specific user in a specific chat.
   */
  public async invalidatePermissionsCache(chatId: string, userId: string): Promise<void> {
    const cacheKey = ChatPermissionsService.cacheKey(chatId, userId);
    await this.cache.delete(cacheKey);
  }
}
