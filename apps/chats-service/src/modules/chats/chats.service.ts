import { once } from '@gurban/kit/core/once';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DbService } from '@poslah/database/db/db.service';
import { isPrismaClientError } from '@poslah/database/db/util';
import { ChatEvent, Prisma } from '@poslah/database/generated/db-client/client';
import { RabbitMqService } from '@poslah/database/rabbitmq/rabbitmq.service';
import type { JsonObject } from '@poslah/util/json-type';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { protobufTimestampFromDate } from '@poslah/util/protobuf-timestamp-to-date';
import { treeifyError, ZodError } from 'zod/v4';

import { GetLastMessageEventsRequest, GetLastMessageEventsResponse } from '../../generated.grpc/chats';
import { chatsTopics } from './chats.topics';
import type { PushChatEventArgs } from './push-chat-event.args';
import type { PushEventResponseDto } from './push-event-response.dto';
import { MessageEventDto, RawEventDto, rawEventSchema } from './raw-event-schema';

export type ChatSelectPayload<S extends Prisma.ChatSelect> = Prisma.ChatGetPayload<
  S extends undefined ? undefined : { select: S }
>;

/**
 *
 * A type representing the event object before Zod validation and coercion.
 * Types like `nn` and `serverTime` are still strings.
 */
interface CandidateEventInput {
  chatId: string;
  authorId: string;
  nn: string;
  createdAt: string;
  type: string;
  payload: JsonObject;
}

@Injectable()
export class ChatsService {
  constructor(
    private readonly db: DbService,
    private readonly rmqService: RabbitMqService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsService.name);
  }

  private async getNN(chatId: string): Promise<bigint> {
    return (
      await this.db.transaction.chatEventsCounter.update({
        where: { chatId },
        data: { lastNn: { increment: 1 } },
      })
    ).lastNn;
  }

  async createChat<S extends Prisma.ChatSelect>(
    data: Omit<Prisma.ChatCreateInput, `counter` | `id` | `events`>,
    select?: S
  ): Promise<ChatSelectPayload<S>> {
    return (await this.db.transaction.chat.create({
      data: { ...data, eventsCounter: {}, messagesCounter: {} },
      select,
    })) as ChatSelectPayload<S>;
  }

  async getLastMessageEvents({
    messageNn,
    chatId,
    afterNn,
  }: GetLastMessageEventsRequest): Promise<GetLastMessageEventsResponse> {
    const events = (await this.db.client.chatEvent.findMany({
      where: {
        chatId: chatId,
        type: 'message',
        nn: { gt: afterNn },
        payload: {
          path: ['nn'],
          equals: String(messageNn),
        },
      },
      orderBy: { nn: 'asc' },
      select: {
        nn: true,
        payload: true,
        createdAt: true,
      },
    })) as (Pick<ChatEvent, `nn` | `createdAt`> & { payload: MessageEventDto['payload'] })[];

    return {
      events: events.map(({ nn, payload }) => ({ nn, payload })),
      oldestCreatedAt: (o => (o ? protobufTimestampFromDate(o) : undefined))(events.at(-1)?.createdAt),
    };
  }

  /**
   * Main entry point for pushing a new event.
   * Orchestrates authorization, sanitization, validation, and publishing.
   */
  async pushEventOptimistic(authorId: string, args: PushChatEventArgs): Promise<PushEventResponseDto> {
    const { chatId, type, payload } = args;

    if (typeof payload !== 'object' || payload == null || Array.isArray(payload)) {
      throw new BadRequestException('Payload must be an object.');
    }

    // 1. Authorize the action
    await this.authorizeEventPush(authorId, chatId, type);

    // 2. Get the next sequence number
    const nextNn = await this.getNN(chatId);
    const serverTime = new Date();

    // 3. Sanitize the incoming payload
    const sanitizedPayload = await this.sanitizePayload(authorId, chatId, type, payload);

    // 4. Assemble the candidate event object
    const candidateEvent: CandidateEventInput = {
      chatId,
      authorId,
      nn: nextNn.toString(),
      createdAt: serverTime.toISOString(),
      type,
      payload: sanitizedPayload,
    };

    // 5. Validate the event against the generic raw schema
    const validatedRawEvent = this.validateEvent(candidateEvent);

    // 6. Publish the single raw event for internal consumption by this same service
    this.rmqService.emit(chatsTopics.rawCreate.name, validatedRawEvent);

    // 7. Return the optimistic response
    return {
      nn: nextNn.toString(),
      serverTime,
    };
  }

  // =======================================================================
  // PRIVATE HELPER METHODS
  // =======================================================================

  /**
   * Checks if a user has permission to perform a specific action in a chat.
   * Throws ForbiddenException if not authorized.
   */
  private async authorizeEventPush(authorId: string, chatId: string, type: string): Promise<void> {
    // Placeholder for your real permission logic
    const canPerform = true;
    if (!canPerform) {
      throw new ForbiddenException(`You do not have permission to perform action '${type}' in this chat.`);
    }
    this.logger.info(`Authorization successful for user ${authorId} in chat ${chatId}`);
  }

  /**
   * Cleans the payload, removing any fields the user is not allowed to modify.
   * @returns A sanitized payload object.
   */
  private async sanitizePayload(
    authorId: string,
    chatId: string,
    type: string,
    payload: JsonObject
  ): Promise<JsonObject> {
    const sanitizedPayload = { ...payload };

    if (type === 'info') {
      const isUserAdmin = false;
      if (!isUserAdmin) {
        delete sanitizedPayload.isArchived;
      }
    }
    return sanitizedPayload;
  }

  /**
   * Validates the candidate event against the main raw event schema.
   * Throws a formatted BadRequestException if validation fails.
   * @returns The strongly typed, validated event DTO.
   */
  private validateEvent(candidateEvent: CandidateEventInput): RawEventDto {
    try {
      // Validate against the all-encompassing `createRawEventSchema`.
      // The specific validation (create vs. patch) will happen in `saveEvent`.
      return rawEventSchema.parse(candidateEvent);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Invalid event structure.',
          errors: treeifyError(error).errors,
        });
      }
      throw error;
    }
  }

  /**
   * Saves an event received from the Kafka topic `events.raw.create`.
   * This method must be idempotent.
   * After saving, it publishes derivative events for read-model projections.
   * @param event The validated event DTO from Kafka.
   */
  public async saveEvent(event: RawEventDto): Promise<void> {
    try {
      // All database writes are wrapped in a transaction for atomicity.
      const savedEvent = await this.db.inOwnTransaction(async () => {
        // Step 1: Save the event to the source-of-truth table.
        const createdEvent = await this.db.transaction.chatEvent.create({
          data: {
            chatId: event.chatId,
            nn: BigInt(event.nn),
            authorId: event.authorId,
            type: event.type,
            payload: event.payload as Prisma.JsonObject, // Cast payload to the expected type
            createdAt: event.createdAt,
          },
        });

        if (event.type === 'info') {
          // The payload here is ChatInfoPayload
          const { title, bio, avatar } = event.payload;
          await this.db.transaction.chat.update({
            where: { id: event.chatId },
            data: {
              // Only update fields that are present in the payload
              ...(title !== undefined && { title }),
              ...(bio !== undefined && { bio }),
              ...(avatar !== undefined && { avatar }),
            },
          });
        }

        return createdEvent;
      });

      // 2. After a successful save, publish the specific, strongly typed event
      // for downstream consumers (like MessagesService).
      switch (savedEvent.type) {
        case 'message': {
          const messagePayload = savedEvent.payload as MessageEventDto[`payload`];
          if (messagePayload.nn === null) {
            // Re-validate against the specific schema to guarantee the contract
            this.rmqService.emit(
              chatsTopics.messageCreated.name,
              chatsTopics.messageCreated.schema.parse(savedEvent)
            );
          } else {
            this.rmqService.emit(
              chatsTopics.messagePatched.name,
              chatsTopics.messagePatched.schema.parse(savedEvent)
            );
          }
          break;
        }
        case 'info':
          this.rmqService.emit(
            chatsTopics.infoPatched.name,
            chatsTopics.infoPatched.schema.parse(savedEvent)
          );
          break;

        default:
          this.logger.warn(
            `Unknown event type in saveEvent, cannot publish projection event: ${savedEvent.type}`
          );
      }
    } catch (error) {
      // Idempotency check: If the event already exists (unique constraint violation),
      // we ignore the error and consider the operation successful.
      if (isPrismaClientError(error) && isPrismaClientError.uniqueConstraintFailed(error)) {
        this.logger.info(`Duplicate event received, ignoring: chatId=${event.chatId}, nn=${event.nn}`);
        return; // Exit gracefully
      }

      // For any other error, log it to be investigated.
      this.logger.error({ error }, `Failed to save event: chatId=${event.chatId}, nn=${event.nn}`);
      // In a production system, you might also publish to a Dead Letter Queue here.
      throw error;
    }
  }
}
