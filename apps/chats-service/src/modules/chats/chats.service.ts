import { ProgrammingError } from '@gurban/kit/core/manual-sorting';
import { once } from '@gurban/kit/core/once';
import { notNull, throwing } from '@gurban/kit/utils/flow-utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '@poslah/database/db/db.service';
import { isPrismaClientError } from '@poslah/database/db/util';
import { ChatEvent, Prisma } from '@poslah/database/generated/db-client/client';
import { RedisService } from '@poslah/database/redis/redis.service';
import type { Topic } from '@poslah/util/declare-events-topic';
import type { JsonObject } from '@poslah/util/json-type';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { protobufLongFromBigint, protobufLongToBigint } from '@poslah/util/protobuf-long-to-bigint';
import { protobufTimestampFromDate } from '@poslah/util/protobuf-timestamp-to-date';
import stringify from 'fast-json-stable-stringify';
import { z } from 'zod/v4';

import {
  GetLastMessageEventsRequest,
  GetLastMessageEventsResponse,
} from '../../generated.grpc/src/grpc/chats';
import { EventsCheckerService } from './events-checker.service';
import type { PushChatEventArgs } from './push-chat-event.args';
import type { PushEventResponseDto } from './push-event-response.dto';
import type {
  InfoEventDto,
  MembershipEventDto,
  MessageEventDto,
  RawEventDto,
  UpdateChatPermissionsDto,
} from './raw-event-schema';
import { infoPatchedEventTopic } from './topic/info-patched-event.topic';
import { membershipChangedEventTopic } from './topic/membership-changed-event.topic';
import { messageCreatedEventTopic } from './topic/message-created-event.topic';
import { messagePatchedEventTopic } from './topic/message-patched-event.topic';
import { rawCreateEventTopic } from './topic/raw-create-event.topic';

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
    private readonly redis: RedisService,
    private readonly loggerBase: Logger,
    private readonly eventChecker: EventsCheckerService
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsService.name);
  }

  /**
   * A generic, type-safe method to publish an event to a Redis Stream.
   * It validates the event against the topic's schema before publishing.
   */
  private async publish<S extends z.ZodType, T extends Topic<S, string>>(
    topic: T,
    event: unknown,
    onBeforePublish?: (data: z.infer<T[`schema`]>) => Promise<void>
  ): Promise<void> {
    try {
      // The schema is already parsed, but this is a final guarantee.
      const validatedEvent = topic.schema.parse(event);
      onBeforePublish && (await onBeforePublish(validatedEvent));
      const eventPayload = JSON.stringify(validatedEvent);

      await this.redis.xadd(topic.name, '*', 'data', eventPayload);

      this.logger.info(`Successfully published event to stream [${topic.name}]`);
    } catch (error) {
      this.logger.error({ error }, `Failed to publish event to stream [${topic.name}]`);
      // Re-throw the error so the caller can handle it (e.g., in a consumer, this would prevent an ack).
      throw error;
    }
  }

  private async getNN(chatId: string): Promise<bigint> {
    return (
      await this.db.transaction.chatEventsCounter.update({
        where: { chatId },
        data: { lastNn: { increment: 1 } },
      })
    ).lastNn;
  }

  private async applyInfoToDB(payload: InfoEventDto[`payload`], event: ChatEvent): Promise<boolean> {
    // The payload here is ChatInfoPayload
    const { title, bio, avatar } = payload;
    await this.db.transaction.chat.update({
      where: { id: event.chatId },
      data: {
        // Only update fields that are present in the payload
        ...(title !== undefined && { title }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
      },
    });
    return true;
  }

  /**
   * Applies membership changes to the database idempotently.
   * @returns `true` if a state change occurred, `false` otherwise.
   */
  private async applyMembershipToDB(
    payload: MembershipEventDto['payload'],
    event: ChatEvent
  ): Promise<boolean> {
    const { userId, action, permissions, roleId } = payload;
    const { chatId } = event;
    let hasChanged = false;

    // --- 1. Handle Permissions Update (for all actions) ---
    const existingRecord = await this.db.transaction.userChatPermissions.findUnique({
      where: { userId_chatId: { userId, chatId } },
      select: { permissions: true, roleId: true },
    });

    const existingPermissions = (existingRecord?.permissions || {}) as Partial<UpdateChatPermissionsDto>;

    // --- 2. Intelligently Merge the Incoming Permission Changes ---
    const newPermissions = { ...existingPermissions }; // Create a mutable copy.

    if (permissions) {
      for (const key of Object.keys(permissions)) {
        const value = permissions[key as keyof typeof permissions];
        if (value === null) {
          // If the value is null, reset the permission (delete the key from the override object).
          delete newPermissions[key as keyof typeof newPermissions];
        } else if (value !== undefined) {
          // Otherwise, set or update the permission.
          newPermissions[key as keyof typeof newPermissions] = value;
        }
      }
    }

    // Only write to the DB if the permissions have actually changed.
    if (
      (roleId && roleId !== existingRecord?.roleId) ||
      stringify(existingPermissions) !== stringify(newPermissions)
    ) {
      await this.db.transaction.userChatPermissions.upsert({
        where: { userId_chatId: { userId, chatId } },
        update: { permissions: newPermissions, roleId },
        create: {
          userId,
          chatId,
          permissions: newPermissions,
          roleId:
            roleId ??
            notNull(
              (await this.db.transaction.chat.findUniqueOrThrow({ where: { id: chatId } })).defaultRoleId
            ),
        },
      });
      hasChanged = true;
    }

    // --- 2. Handle Membership Status Change ---
    if (action === 'added') {
      const existingMember = await this.db.transaction.chatMember.findUnique({
        where: { userId_chatId: { userId, chatId } },
      });
      if (!existingMember) {
        await this.db.transaction.chatMember.create({ data: { userId, chatId } });
        hasChanged = true;
      }
    } else if (action === 'removed') {
      const { count } = await this.db.transaction.chatMember.deleteMany({
        where: { userId, chatId },
      });
      if (count > 0) {
        hasChanged = true;
        // Optionally apply a "permissions on leave" policy here if needed
        // const chat = await this.db.transaction.chat.findUnique(...);
        // await this.db.transaction.userChatPermissions.update(...);
      }
    }
    // For 'updated' action, we only care about the permissions change handled above.

    return hasChanged;
  }

  public async createChat<S extends Prisma.ChatSelect>(
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
    const events = (await this.db.transaction.chatEvent.findMany({
      where: {
        chatId: chatId,
        type: 'message',
        nn: { gt: protobufLongToBigint(afterNn) },
        payload: {
          path: ['nn'],
          equals: messageNn.toString(),
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
      events: events.map(({ nn, payload }) => ({
        nn: protobufLongFromBigint(nn),
        payload,
      })),
      oldestCreatedAt: (o => (o ? protobufTimestampFromDate(o) : undefined))(events.at(0)?.createdAt),
    };
  }

  /**
   * Main entry point for pushing a new event.
   * Orchestrates authorization, sanitization, validation, and publishing.
   */
  public async pushEventOptimistic(authorId: string, args: PushChatEventArgs): Promise<PushEventResponseDto> {
    const { chatId, type, payload } = args;

    if (typeof payload !== 'object' || payload == null || Array.isArray(payload)) {
      throw new BadRequestException('Payload must be an object.');
    }

    // 2. Get the next sequence number
    const createdAt = new Date();

    // 4. Assemble the candidate event object
    const candidateEvent: CandidateEventInput = {
      chatId,
      authorId,
      nn: '0', // placeholder
      createdAt: createdAt.toISOString(),
      type,
      payload,
    } satisfies CandidateEventInput;

    // 5. Validate the event against the generic raw schema
    // 6. Publish the single raw event for internal consumption by this same service
    let nn: bigint | undefined;
    await this.publish(rawCreateEventTopic, candidateEvent, async data => {
      await this.eventChecker.authorizeEvent(data);
      nn = data.nn = await this.getNN(chatId);
    });

    // 7. Return the optimistic response
    return {
      nn: notNull(nn).toString(),
      createdAt,
    };
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
      const { savedEvent, hasChanges } = await this.db.inOwnTransaction(async () => {
        // Step 1: Save the event to the source-of-truth table.
        const savedEvent = await this.db.transaction.chatEvent.create({
          data: {
            chatId: event.chatId,
            nn: event.nn,
            authorId: event.authorId,
            type: event.type,
            payload: event.payload as Prisma.JsonObject, // Cast payload to the expected type
            createdAt: event.createdAt,
          },
        });

        return {
          savedEvent,
          hasChanges:
            event.type === 'message'
              ? true
              : event.type === 'info'
                ? await this.applyInfoToDB(event.payload, savedEvent)
                : event.type === 'membership'
                  ? await this.applyMembershipToDB(event.payload, savedEvent)
                  : throwing(
                      () => new ProgrammingError(`unhandled event type: ${(event as { type: string }).type}`)
                    ),
        };
      });

      // 2. After a successful save, publish the specific, strongly typed event
      // for downstream consumers (like MessagesService).
      if (hasChanges) {
        switch (savedEvent.type) {
          case 'message': {
            const messagePayload = savedEvent.payload as MessageEventDto[`payload`];
            await this.publish(
              messagePayload.nn === null ? messageCreatedEventTopic : messagePatchedEventTopic,
              savedEvent
            );
            break;
          }
          case 'info':
            await this.publish(infoPatchedEventTopic, savedEvent);
            break;

          case 'membership':
            await this.publish(membershipChangedEventTopic, savedEvent);
            break;

          default:
            this.logger.warn(
              `Unknown event type in saveEvent, cannot publish projection event: ${savedEvent.type}`
            );
        }
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
