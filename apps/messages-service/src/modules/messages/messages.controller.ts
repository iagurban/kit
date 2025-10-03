import { once } from '@gurban/kit/core/once';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { chatsTopics } from '@poslah/chats-service/modules/chats/chats.topics';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { z } from 'zod/v4';

import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(
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
  @EventPattern(chatsTopics.messageCreated.name)
  async handleMessageCreate(
    @Payload() data: z.infer<typeof chatsTopics.messageCreated.schema>,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      // We can be certain `data` is a CreateMessageEventDto, so we call `createMessage`.
      await this.messagesService.createMessage(data);
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message create event nn=${data.nn}`);
      channel.nack(originalMsg, false, false);
    }
  }

  /**
   * Listens ONLY to the message PATCHING topic.
   * The pattern and payload type are sourced directly from the `chatsTopics` contract.
   */
  @EventPattern(chatsTopics.messagePatched.name)
  async handleMessagePatch(
    @Payload() data: z.infer<typeof chatsTopics.messagePatched.schema>,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      // We can be certain `data` is an UpdateMessageEventDto, so we call `patchMessage`.
      await this.messagesService.patchMessage(data);
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error({ error }, `Failed to process message patch event nn=${data.nn}`);
      channel.nack(originalMsg, false, false);
    }
  }
}
