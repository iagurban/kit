import { JsonObject } from '@gurban/kit/core/json-type';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { Injectable } from '@nestjs/common';
import { CacheService } from '@poslah/util/modules/cache/cache.module';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { MessageDto } from '@poslah/util/schemas/message.schema';

/**
 * The data structure for the "last message" snapshot,
 * stored in the `chat-metadata:{chatId}` hash.
 */
export interface LastMessageSnapshot {
  nn: bigint;
  text: string | null;
  authorId: string;
  // authorName: string;
  createdAt: Date;
}

/**
 * The data structure returned for the "sync" query.
 */
export interface ChatSyncMetadata {
  totalCount: number;
  deletedCount: number;
  latestChatNn: bigint;
}

// --- Redis Key Constants ---
const chatTotalCountsKey = 'chats:total-counts';
const chatDeletedCountsKey = 'chats:deleted-counts';
const chatMetadataKey = (chatId: string) => `chat-metadata:${chatId}`;

@Injectable()
export class MessagesCacheService {
  constructor(
    private readonly cache: CacheService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesCacheService.name);
  }

  // =======================================================================
  // READ METHODS
  // =======================================================================

  /**
   * Fetches all the metadata needed for the "get messages newer than"
   * algorithm in a single, efficient pipelined query.
   */
  async getChatSyncMetadata(chatId: string): Promise<ChatSyncMetadata> {
    const metadataKey = chatMetadataKey(chatId);

    const results = await this.cache.getManyFieldsValues({
      // 1. Get a total message count for the chat
      [chatTotalCountsKey]: chatId,
      // 2. Get a deleted message count for the chat
      [chatDeletedCountsKey]: chatId,
      // 3. Get an `nn` of the last message from the chat's metadata hash
      [metadataKey]: `nn`,
    });

    if (!results) {
      throw new Error('Redis pipeline execution failed');
    }

    const totalCountStr = results[chatTotalCountsKey];
    const deletedCountStr = results[chatDeletedCountsKey];
    const latestChatNnStr = results[metadataKey];

    return {
      totalCount: totalCountStr ? parseInt(totalCountStr, 10) : 0,
      deletedCount: deletedCountStr ? parseInt(deletedCountStr, 10) : 0,
      latestChatNn: latestChatNnStr ? BigInt(latestChatNnStr) : 0n,
    };
  }

  /**
   * Fetches the full snapshot of the last message for a given chat.
   * This is used for populating the chat list UI.
   */
  async getLastMessageSnapshot(chatId: string): Promise<LastMessageSnapshot | null> {
    const data = (await this.cache.getHashAsObject(chatMetadataKey(chatId))) as
      | { [K in keyof LastMessageSnapshot]?: string }
      | null;

    if (!data?.nn) {
      return null;
    }

    // The values are already parsed from JSON strings to native types.
    return {
      nn: BigInt(data.nn),
      text: data.text ?? null,
      authorId: notNull(data.authorId),
      createdAt: new Date(notNull(data.createdAt)),
    };
  }

  // =======================================================================
  // WRITE METHODS
  // =======================================================================

  /**
   * Atomically increments the total message count for a chat.
   */
  async incrementTotalCount(chatId: string): Promise<void> {
    await this.cache.increment(chatTotalCountsKey, chatId, 1);
  }

  /**
   * Atomically increments the deleted message count for a chat.
   */
  async incrementDeletedCount(chatId: string): Promise<void> {
    await this.cache.increment(chatDeletedCountsKey, chatId, 1);
  }

  /**
   * Updates the "last message" snapshot for a chat. This is called
   * every time a new message is created, edited, or a deletion
   * causes the last message to change.
   */
  async setLastMessageSnapshot(chatId: string, message: MessageDto): Promise<void> {
    // putJSONToRedisHash will JSON.stringify each value, preserving type info.
    const snapshotData: JsonObject = {
      nn: message.nn.toString(),
      text: message.text || null,
      authorId: message.authorId,
      createdAt: message.createdAt.toISOString(),
    };

    // This helper function handles serialization and uses a pipeline for atomicity.
    await this.cache.putObjectToHash(chatMetadataKey(chatId), snapshotData);
  }
}
