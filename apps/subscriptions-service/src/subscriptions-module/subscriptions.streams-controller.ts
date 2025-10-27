import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Controller } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { eventsMembershipChangedTopic } from '@poslah/chats-service/topics/events-membership-changed-topic';
import { userMembershipPubsub } from '@poslah/chats-service/topics/user-membership.pubsub-topic';
import { messagesUpsertPubsub } from '@poslah/messages-service/topics/messages-upsert.pubsub-topic';
import { projectionMessageCreatedTopic } from '@poslah/messages-service/topics/projection-message-created.topic';
import { projectionMessagePatchedTopic } from '@poslah/messages-service/topics/projection-message-patched.topic';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { RedisStreamHandler } from '@poslah/util/modules/nosql/redis/stream-consumer-module/redis-stream-handler.decorator';
import { SubscriptionsPublisherService } from '@poslah/util/modules/nosql/redis/subscriptions-publisher.service';
import { IWithModuleRef } from '@poslah/util/modules/with-module-ref.interface';
import { z } from 'zod/v4';

@Controller()
export class SubscriptionsStreamsController implements IWithModuleRef {
  constructor(
    private readonly publisherService: SubscriptionsPublisherService,
    private readonly loggerBase: Logger,
    readonly moduleRef: ModuleRef
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SubscriptionsStreamsController.name);
  }

  @RedisStreamHandler(projectionMessageCreatedTopic)
  async handleMessageCreated(data: z.infer<typeof projectionMessageCreatedTopic.schema>) {
    try {
      await this.publisherService.publish(messagesUpsertPubsub, data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message created event for chat ${data.chatId}`);
      throw error;
    }
  }

  @RedisStreamHandler(projectionMessagePatchedTopic)
  async handleMessagePatched(data: z.infer<typeof projectionMessagePatchedTopic.schema>) {
    try {
      await this.publisherService.publish(messagesUpsertPubsub, data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message patched event for chat ${data.chatId}`);
      throw error;
    }
  }

  @RedisStreamHandler(eventsMembershipChangedTopic)
  async handleMembershipChange(data: z.infer<typeof eventsMembershipChangedTopic.schema>) {
    const { chatId, payload, type } = data;
    try {
      await this.publisherService.publish(userMembershipPubsub, { chatId, userId: payload.userId, type });
    } catch (error) {
      this.logger.error({ error }, `Failed to process membership change for user ${payload.userId}`);
      throw error;
    }
  }
}
