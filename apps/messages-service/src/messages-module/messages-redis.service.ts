import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { Injectable } from '@nestjs/common';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { RedisService } from '@poslah/util/modules/nosql/redis/redis.service';
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
export class MessagesRedisService {
  constructor(
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesRedisService.name);
  }

  // =======================================================================
  // READ METHODS
  // =======================================================================

  /**
   * Fetches all the metadata needed for the "get messages newer than"
   * algorithm in a single, efficient pipelined query.
   */
  async getChatSyncMetadata(chatId: string): Promise<ChatSyncMetadata> {
    const pipeline = this.redis
      .pipeline()
      // 1. Get a total message count for the chat
      .hget(chatTotalCountsKey, chatId)
      // 2. Get a deleted message count for the chat
      .hget(chatDeletedCountsKey, chatId)
      // 3. Get an `nn` of the last message from the chat's metadata hash
      .hget(chatMetadataKey(chatId), `nn`);

    const results = await pipeline.exec();
    if (!results) {
      throw new Error('Redis pipeline execution failed');
    }

    const totalCountStr = results[0][1] as string | null;
    const deletedCountStr = results[1][1] as string | null;
    const latestChatNnStr = results[2][1] as string | null;

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
    const data = (await this.redis.hgetall(chatMetadataKey(chatId))) as {
      [K in keyof LastMessageSnapshot]?: string;
    };

    if (!data.nn) {
      return null;
    }

    // Convert from string-based hash back to native types
    return {
      text: data.text ?? null,
      authorId: notNull(data.authorId),
      createdAt: new Date(notNull(data.createdAt)),
      nn: BigInt(data.nn),
    };
  }

  // =======================================================================
  // WRITE METHODS
  // =======================================================================

  /**
   * Atomically increments the total message count for a chat.
   */
  async incrementTotalCount(chatId: string): Promise<void> {
    await this.redis.hincrby(chatTotalCountsKey, chatId, 1);
  }

  /**
   * Atomically increments the deleted message count for a chat.
   */
  async incrementDeletedCount(chatId: string): Promise<void> {
    await this.redis.hincrby(chatDeletedCountsKey, chatId, 1);
  }

  /**
   * Updates the "last message" snapshot for a chat. This is called
   * every time a new message is created, edited, or a deletion
   * causes the last message to change.
   */
  async setLastMessageSnapshot(chatId: string, message: MessageDto): Promise<void> {
    // We must convert native types to strings for storage in a Redis Hash.
    const snapshotData = {
      nn: message.nn.toString(),
      text: message.text || '',
      authorId: message.authorId,
      createdAt: message.createdAt.toISOString(),
      // authorName: message
    } satisfies { [K in keyof LastMessageSnapshot]: string };

    await this.redis.hset(chatMetadataKey(chatId), snapshotData);
  }
}
