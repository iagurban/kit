import { once } from '@gurban/kit/core/once';
import { Controller } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { RedisStreamHandler } from '@poslah/util/nosql/redis/redis-stream-handler.decorator';
import { IWithModuleRef } from '@poslah/util/with-module-ref.interface';
import { z } from 'zod';

import { membershipChangedEventTopic } from '../topics/membership-changed-event.topic';
import { rawCreateEventTopic } from '../topics/raw-create-event.topic';
import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsService } from './chats.service';

@Controller()
export class ChatsStreamsController implements IWithModuleRef {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly permissionsService: ChatPermissionsService,
    private readonly loggerBase: Logger,
    readonly moduleRef: ModuleRef
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsStreamsController.name);
  }

  /**
   * Listens to the durable stream of membership changes.
   * Its only job is to invalidate the Redis cache for the affected user.
   */
  @RedisStreamHandler(membershipChangedEventTopic.name, membershipChangedEventTopic.schema)
  async handleMembershipChange(data: z.infer<typeof membershipChangedEventTopic.schema>) {
    const {
      chatId,
      payload: { userId },
    } = data;
    this.logger.info(`Membership change detected for user ${userId} in chat ${chatId}. Invalidating cache.`);

    try {
      // Delegate the cache invalidation logic to the permissions service.
      await this.permissionsService.invalidatePermissionsCache(chatId, userId);
      this.logger.info(`Cache invalidated successfully for permissions:${chatId}:${userId}`);
    } catch (error) {
      this.logger.error(
        { error },
        `Failed to invalidate permissions cache for user ${userId} in chat ${chatId}`
      );
      // We throw the error so the RedisStreamConsumer class can handle the failure
      // (e.g., leave the message in the PEL for the reclaim worker).
      throw error;
    }
  }

  /**
   * Consumes raw events from the internal `events.raw.create` topic,
   * triggers the save process, and handles message acknowledgement.
   */
  @RedisStreamHandler(rawCreateEventTopic.name, rawCreateEventTopic.schema)
  async handleRawEventCreate(data: z.infer<typeof rawCreateEventTopic.schema>) {
    this.logger.info(`Received raw event to save: chatId=${data.chatId}, nn=${data.nn}`);

    try {
      // Delegate the entire save-and-publish logic to the service
      await this.chatsService.saveEvent(data);

      this.logger.info(`Successfully processed event nn=${data.nn}`);
    } catch (error) {
      this.logger.error({ error }, `Failed to process event nn=${data.nn}.`);
      throw error;
    }
  }
}
