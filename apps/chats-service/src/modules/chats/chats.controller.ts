import { once } from '@gurban/kit/core/once';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { z } from 'zod/v4';

import {
  ChatsServiceController,
  ChatsServiceControllerMethods,
  GetLastMessageEventsRequest,
  GetLastMessageEventsResponse,
} from '../../generated.grpc/chats';
import { ChatsService } from './chats.service';
import { chatsTopics } from './chats.topics';

@Controller()
@ChatsServiceControllerMethods()
export class ChatsController implements ChatsServiceController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsController.name);
  }

  getLastMessageEvents(args: GetLastMessageEventsRequest): Promise<GetLastMessageEventsResponse> {
    return this.chatsService.getLastMessageEvents(args);
  }

  /**
   * Consumes raw events from the internal `events.raw.create` topic,
   * triggers the save process, and handles message acknowledgement.
   */
  @EventPattern(chatsTopics.rawCreate.name)
  async handleRawEventCreate(
    @Payload() data: z.infer<typeof chatsTopics.rawCreate.schema>,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.logger.info(`Received raw event to save: chatId=${data.chatId}, nn=${data.nn}`);

    try {
      // Delegate the entire save-and-publish logic to the service
      await this.chatsService.saveEvent(data);

      // If saveEvent completes without error, acknowledge the message
      channel.ack(originalMsg);
      this.logger.info(`Successfully processed and ACKed event nn=${data.nn}`);
    } catch (error) {
      // If saveEvent throws an error (e.g., a non-idempotency DB error),
      // negatively acknowledge to send it to the Dead Letter Queue.
      this.logger.error({ error }, `Failed to process event nn=${data.nn}. NACKing message.`);
      channel.nack(originalMsg, false, false);
    }
  }
}
