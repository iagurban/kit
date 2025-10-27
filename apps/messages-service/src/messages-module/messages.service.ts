import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { notNull } from '@gurban/kit/utils/flow/flow-utils';
import { retrying } from '@gurban/kit/utils/flow/retrying';
import { Injectable } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { DbService } from '@poslah/util/modules/db-module/db.service';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { RedisStreamEmitter } from '@poslah/util/modules/nosql/redis/redis-stream-emitter';
import { CreateMessageEventDTO } from '@poslah/util/schemas/create-message-event-schema';
import { MessageDto } from '@poslah/util/schemas/message.schema';
import { MessageEventDto } from '@poslah/util/schemas/some-message-event-schema';
import { UpdateMessageEventDTO } from '@poslah/util/schemas/update-message-event-schema';

import { projectionMessageCreatedTopic } from '../topics/projection-message-created.topic';
import { projectionMessagePatchedTopic } from '../topics/projection-message-patched.topic';
import { LwtError, MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(
    private readonly db: DbService,
    private readonly loggerBase: Logger,
    private readonly messagesDb: MessagesRepository,
    private readonly chatsGRPCClient: ChatsGRPCClient,
    private readonly streamEmitter: RedisStreamEmitter
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

      const [createdMessage] = await this.messagesDb.getById(event.chatId, [messageNn]);
      if (createdMessage) {
        await this.streamEmitter.publish(projectionMessageCreatedTopic, createdMessage);
      }
    } catch (error) {
      this.logger.error(
        { error },
        `Failed to create message for event nn=${event.nn} in chat ${event.chatId}`
      );
      // Re-throw to ensure the stream consumer does not acknowledge the source event.
      throw error;
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

      const [finalMessageState] = await this.messagesDb.getById(chatId, [targetMessageNn]);
      if (finalMessageState) {
        await this.streamEmitter.publish(projectionMessagePatchedTopic, finalMessageState);
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
    newerEvents: Pick<MessageEventDto, 'nn' | 'payload'>[]
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

  async getMessagesOlderThanNn<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    nn: bigint,
    limit: number,
    select?: S
  ) {
    return this.messagesDb.getMessagesOlderThanNn(chatId, nn, limit, select);
  }

  async getMessagesNewerThanNn<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    nn: bigint,
    limit: number,
    select?: S
  ) {
    return this.messagesDb.getMessagesNewerThanNn(chatId, nn, limit, select);
  }

  async getLatestMessages<S extends Partial<Record<keyof MessageDto, boolean>>>(
    chatId: string,
    limit: number,
    select?: S
  ) {
    return this.messagesDb.getLatestMessages(chatId, limit, select);
  }
}
