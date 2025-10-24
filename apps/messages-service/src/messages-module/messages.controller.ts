import { once } from '@gurban/kit/core/once';
import { Controller } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { messageCreatedEventTopic } from '@poslah/chats-service/topics/message-created-event.topic';
import { messagePatchedEventTopic } from '@poslah/chats-service/topics/message-patched-event.topic';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { RedisStreamHandler } from '@poslah/util/nosql/redis/redis-stream-handler.decorator';
import { IWithModuleRef } from '@poslah/util/with-module-ref.interface';
import { z } from 'zod/v4';

import { MessagesService } from './messages.service';

@Controller()
export class MessagesController implements IWithModuleRef {
  constructor(
    readonly moduleRef: ModuleRef,
    private readonly messagesService: MessagesService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesController.name);
  }

  /**
   * Listens ONLY to the message CREATION topic.
   * The pattern and payload type are sourced directly from the `chatsTopics` contract.
   */
  @RedisStreamHandler(messageCreatedEventTopic.name, messageCreatedEventTopic.schema)
  async handleMessageCreate(data: z.infer<typeof messageCreatedEventTopic.schema>) {
    try {
      // We can be certain `data` is a CreateMessageEventDto, so we call `createMessage`.
      await this.messagesService.createMessage(data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message create event nn=${data.nn}`);
      throw error;
    }
  }

  /**
   * Listens ONLY to the message PATCHING topic.
   * The pattern and payload type are sourced directly from the `chatsTopics` contract.
   */
  @RedisStreamHandler(messagePatchedEventTopic.name, messagePatchedEventTopic.schema)
  async handleMessagePatch(data: z.infer<typeof messagePatchedEventTopic.schema>) {
    try {
      // We can be certain `data` is an UpdateMessageEventDto, so we call `patchMessage`.
      await this.messagesService.patchMessage(data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message patch event nn=${data.nn}`);
      throw error;
    }
  }
}
