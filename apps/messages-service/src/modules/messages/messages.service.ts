import { once } from '@gurban/kit/core/once';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { Injectable } from '@nestjs/common';
import type {
  CreateMessageEventDTO,
  MessageEventDto,
  UpdateMessageEventDTO,
} from '@poslah/chats-service/entities/raw-event-schema';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { DbService } from '@poslah/database/db/db.service';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { retrying } from '@poslah/util/retrying';

import { LwtError, MessagesDb } from './messages-db';

@Injectable()
export class MessagesService {
  constructor(
    private readonly db: DbService,
    private readonly loggerBase: Logger,
    private readonly messagesDb: MessagesDb,
    private readonly chatsGRPCClient: ChatsGRPCClient
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesService.name);
  }

  /**
   * Atomically gets the next sequential message number for a given chat.
   */
  private async popNn(chatId: string): Promise<bigint> {
    return (
      await this.db.transaction.messagesCounter.update({
        where: { chatId },
        data: { lastNn: { increment: 1 } },
      })
    ).lastNn;
  }

  /**
   * Creates a new message record using the pre-compiled query generator.
   */
  async createMessage(event: CreateMessageEventDTO): Promise<void> {
    try {
      const messageNn = await this.popNn(event.chatId);
      this.logger.info(`Creating new message in chat ${event.chatId} with nn=${messageNn}`);

      await this.messagesDb.insert(event, messageNn);

      const createdMessage = await this.messagesDb.get(event.chatId, messageNn);
      if (createdMessage) {
        /// TODO
        // this.kafkaClient.emit(
        //   messageCreatedEventTopic.name,
        //   messageCreatedEventTopic.schema.parse(createdMessage)
        // );
      }
    } catch (error) {
      this.logger.error(
        { error },
        `Failed to create message for event nn=${event.nn} in chat ${event.chatId}`
      );
    }
  }

  /**
   * Updates an existing message by reconstructing its final state from the event stream.
   */
  async patchMessage(event: UpdateMessageEventDTO): Promise<void> {
    const targetMessageNn = notNull(event.payload.nn);
    const { chatId } = event;

    try {
      await this.performReliablePatch(event);

      const finalMessageState = await this.messagesDb.get(chatId, targetMessageNn);
      if (finalMessageState) {
        /// TODO
        // this.kafkaClient.emit(
        //   messagePatchedEventTopic.name,
        //   messagePatchedEventTopic.schema.parse(finalMessageState)
        // );
      }
    } catch (error) {
      this.logger.error(
        { error },
        `Failed to patch message nn=${targetMessageNn} in chat ${chatId} after all retries.`
      );
      throw error;
    }
  }

  static readonly patchRetryTimeoutMs = 200;

  /**
   * Performs the read-reconstruct-write loop with retries until success or timeout.
   */
  private async performReliablePatch(event: MessageEventDto): Promise<void> {
    const targetMessageNn = notNull(event.payload.nn);

    return retrying(
      (error, attempt) =>
        error instanceof LwtError ? MessagesService.patchRetryTimeoutMs + Math.random() * 100 : false,
      async () => {
        const currentState = await this.messagesDb.getState(event.chatId, targetMessageNn);
        if (!currentState) {
          this.logger.warn(`Message ${targetMessageNn} not found for patching, aborting attempt.`);
          return;
        }

        const result = await this.attemptUpdate(event, currentState);
        if (!result) {
          this.logger.warn(`Patch for message ${targetMessageNn} resulted in no fields to update.`);
          return;
        }

        if (!result.wasApplied()) {
          throw new LwtError('LWT failed; another process updated the row.');
        }

        this.logger.info(`LWT update for message ${targetMessageNn} succeeded.`);
      }
    );
  }

  /**
   * A pure function that decides which path (fast or slow) to take and builds the
   * corresponding update query.
   */
  private async attemptUpdate(event: MessageEventDto, currentState: { editedNn: bigint }) {
    const shared = {
      chatId: event.chatId,
      targetMessageNn: notNull(event.payload.nn),
      ifConditionNn: currentState.editedNn,
    } as const;

    if (event.nn > shared.ifConditionNn) {
      // FAST PATH
      return this.messagesDb.update(shared, event.payload, event.createdAt, event.nn);
    } else {
      // SLOW PATH (OUT-OF-ORDER)
      const events = await this.chatsGRPCClient.getLastMessageEvents(
        shared.chatId,
        event.nn,
        shared.targetMessageNn
      );
      const { patch, latest } = this.buildFinalPatch(event, events.events);
      return this.messagesDb.update(shared, patch, events?.oldestCreatedAt ?? event.createdAt, latest.nn);
    }
  }

  /**
   * A pure function that merges event payloads to determine the final state of a patch.
   */
  private buildFinalPatch(
    currentEvent: MessageEventDto,
    newerEvents: Pick<MessageEventDto, `nn` | `payload`>[]
  ) {
    const allRelevantEvents = [currentEvent, ...newerEvents].sort((a, b) =>
      a.nn < b.nn ? -1 : a.nn > b.nn ? 1 : 0
    ); // size >= 1

    const finalPatch = {};
    for (const event of allRelevantEvents) {
      Object.assign(finalPatch, event.payload);
    }

    return { patch: finalPatch as MessageEventDto['payload'], latest: allRelevantEvents.at(-1)! };
  }
}
