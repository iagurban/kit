import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Controller } from '@nestjs/common';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { MqHandler } from '@poslah/util/modules/mq-consumer-module/mq-handler.decorator';
import { z } from 'zod';

import { eventsMembershipChangedTopic } from '../topics/events-membership-changed-topic';
import { eventsRawCreateTopic } from '../topics/events-raw-create-topic';
import { ChatPermissionsService } from './chat-permissions.service';
import { ChatsService } from './chats.service';

@Controller()
export class ChatsMqController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly permissionsService: ChatPermissionsService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsMqController.name);
  }

  /**
   * Listens to the durable stream of membership changes.
   * Its only job is to invalidate the Redis cache for the affected user.
   */
  @MqHandler(eventsMembershipChangedTopic)
  async handleMembershipChange(data: z.infer<typeof eventsMembershipChangedTopic.schema>) {
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
  @MqHandler(eventsRawCreateTopic)
  async handleRawEventCreate(data: z.infer<typeof eventsRawCreateTopic.schema>) {
    console.log(`2222222222222222222222222`);
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
