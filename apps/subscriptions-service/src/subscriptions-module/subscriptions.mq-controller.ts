import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Controller } from '@nestjs/common';
import { eventsMembershipChangedTopic } from '@poslah/chats-service/topics/events-membership-changed-topic';
import { userMembershipPubsub } from '@poslah/chats-service/topics/user-membership.pubsub-topic';
import { messagesUpsertPubsub } from '@poslah/messages-service/topics/messages-upsert.pubsub-topic';
import { projectionMessageCreatedTopic } from '@poslah/messages-service/topics/projection-message-created.topic';
import { projectionMessagePatchedTopic } from '@poslah/messages-service/topics/projection-message-patched.topic';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { MqHandler } from '@poslah/util/modules/mq-consumer-module/mq-handler.decorator';
import { PubSubPublisherService } from '@poslah/util/modules/pubsub/pubsub-publisher.service';
import { z } from 'zod/v4';

@Controller()
export class SubscriptionsMqController {
  constructor(
    private readonly pubSubPublisher: PubSubPublisherService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SubscriptionsMqController.name);
  }

  @MqHandler(projectionMessageCreatedTopic)
  async handleMessageCreated(data: z.infer<typeof projectionMessageCreatedTopic.schema>) {
    try {
      await this.pubSubPublisher.publish(messagesUpsertPubsub, data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message created event for chat ${data.chatId}`);
      throw error;
    }
  }

  @MqHandler(projectionMessagePatchedTopic)
  async handleMessagePatched(data: z.infer<typeof projectionMessagePatchedTopic.schema>) {
    try {
      await this.pubSubPublisher.publish(messagesUpsertPubsub, data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message patched event for chat ${data.chatId}`);
      throw error;
    }
  }

  @MqHandler(eventsMembershipChangedTopic)
  async handleMembershipChange(data: z.infer<typeof eventsMembershipChangedTopic.schema>) {
    const { chatId, payload, type } = data;
    try {
      await this.pubSubPublisher.publish(userMembershipPubsub, { chatId, userId: payload.userId, type });
    } catch (error) {
      this.logger.error({ error }, `Failed to process membership change for user ${payload.userId}`);
      throw error;
    }
  }
}
