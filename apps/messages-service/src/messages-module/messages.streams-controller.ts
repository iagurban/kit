import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Controller } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { eventsMessageCreatedTopic } from '@poslah/chats-service/topics/events-message-created-topic';
import { eventsMessagePatchedTopic } from '@poslah/chats-service/topics/events-message-patched-topic';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { RedisStreamHandler } from '@poslah/util/modules/nosql/redis/stream-consumer-module/redis-stream-handler.decorator';
import { IWithModuleRef } from '@poslah/util/modules/with-module-ref.interface';
import { z } from 'zod/v4';

import { MessagesService } from './messages.service';

@Controller()
export class MessagesStreamsController implements IWithModuleRef {
  constructor(
    readonly moduleRef: ModuleRef,
    private readonly messagesService: MessagesService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesStreamsController.name);
  }

  /**
   * Listens ONLY to the message CREATION topic.
   * The pattern and payload type are sourced directly from the `chatsTopics` contract.
   */
  @RedisStreamHandler(eventsMessageCreatedTopic)
  async handleMessageCreate(data: z.infer<typeof eventsMessageCreatedTopic.schema>) {
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
  @RedisStreamHandler(eventsMessagePatchedTopic)
  async handleMessagePatch(data: z.infer<typeof eventsMessagePatchedTopic.schema>) {
    try {
      // We can be certain `data` is an UpdateMessageEventDto, so we call `patchMessage`.
      await this.messagesService.patchMessage(data);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message patch event nn=${data.nn}`);
      throw error;
    }
  }
}
