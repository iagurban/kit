import { once } from '@gurban/kit/core/once';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ChatsServiceClient } from '@poslah/chats-service/generated.grpc/chats';
import { chatsTopics } from '@poslah/chats-service/modules/chats/chats.topics';
import type {
  CreateMessageEventDTO,
  MessageEventDto,
  UpdateMessageEventDTO,
} from '@poslah/chats-service/modules/chats/raw-event-schema';
import { DbService } from '@poslah/database/db/db.service';
import { KafkaService } from '@poslah/database/kafka/kafka.service';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { protobufTimestampToDate } from '@poslah/util/protobuf-timestamp-to-date';
import { retrying } from '@poslah/util/retrying';
import { firstValueFrom } from 'rxjs';

import { LwtError, MessagesDb } from './messages-db';

@Injectable()
export class MessagesService implements OnModuleInit {
  private chatsGrpcService!: ChatsServiceClient;

  constructor(
    private readonly db: DbService,
    private readonly kafkaClient: KafkaService,
    private readonly loggerBase: Logger,
    private readonly messagesDb: MessagesDb,
    @Inject('CHATS_SERVICE_CLIENT') private readonly grpcClient: ClientGrpc
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MessagesService.name);
  }

  onModuleInit() {
    this.chatsGrpcService = this.grpcClient.getService<ChatsServiceClient>('ChatsService');
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
        this.kafkaClient.emit(
          chatsTopics.messageCreated.name,
          chatsTopics.messageCreated.schema.parse(createdMessage)
        );
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
        this.kafkaClient.emit(
          chatsTopics.messagePatched.name,
          chatsTopics.messagePatched.schema.parse(finalMessageState)
        );
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
      const events = await this.getNewerEventsForMessage(shared.chatId, event.nn, shared.targetMessageNn);
      const { patch, latest } = this.buildFinalPatch(event, events?.events ?? []);
      return this.messagesDb.update(shared, patch, events?.oldestCreatedAt ?? event.createdAt, latest.nn);
    }
  }

  /**
   * Fetches all events from the `chats-service` via gRPC.
   */
  private async getNewerEventsForMessage(chatId: string, currentEventNn: bigint, targetMessageNn: bigint) {
    try {
      const { events, oldestCreatedAt } = await firstValueFrom(
        this.chatsGrpcService.getLastMessageEvents({
          chatId: chatId,
          messageNn: targetMessageNn,
          afterNn: currentEventNn,
        })
      );
      return {
        events: events satisfies { nn: bigint; payload: unknown }[] as Pick<
          MessageEventDto,
          `nn` | `payload`
        >[],
        oldestCreatedAt: oldestCreatedAt ? protobufTimestampToDate(oldestCreatedAt) : undefined,
      };
    } catch (error) {
      this.logger.error({ error }, `gRPC call to chats-service failed for getNewerEventsForMessage`);
      // Depending on the error, you might want to throw to let the retry handler catch it
      throw error;
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
