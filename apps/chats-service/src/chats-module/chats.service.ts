import type { JsonObject } from '@gurban/kit/core/json-type';
import { ProgrammingError } from '@gurban/kit/core/manual-sorting';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { notNull, throwing } from '@gurban/kit/utils/flow/flow-utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatEvent, Prisma } from '@poslah/database/generated/db-client/client';
import { DbService } from '@poslah/util/modules/db-module/db.service';
import { isPrismaClientError } from '@poslah/util/modules/db-module/util';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { MqPublisher } from '@poslah/util/modules/nosql/redis/mq-publisher';
import { UpdateChatPermissionsDto } from '@poslah/util/schemas/chat-permissions-schema';
import { MembershipEventDto } from '@poslah/util/schemas/membership-event-schema';
import type { RawEventDto } from '@poslah/util/schemas/raw-event-schema';
import { MessageEventDto } from '@poslah/util/schemas/some-message-event-schema';
import stringify from 'fast-json-stable-stringify';

import type { PushChatEventArgs } from '../entities/push-chat-event.args';
import type { PushEventResponseDto } from '../entities/push-event-response.dto';
import { eventsInfoPatchedTopic } from '../topics/events-info-patched-topic';
import { eventsMembershipChangedTopic } from '../topics/events-membership-changed-topic';
import { eventsMessageCreatedTopic } from '../topics/events-message-created-topic';
import { eventsMessagePatchedTopic } from '../topics/events-message-patched-topic';
import { eventsRawCreateTopic } from '../topics/events-raw-create-topic';
import { ChatSelectPayload, ChatsRepository } from './chats.repository';
import { EventsCheckerService } from './events-checker.service';

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
export class ChatsService /*implements OnModuleInit*/ {
  constructor(
    private readonly db: DbService,
    private readonly loggerBase: Logger,
    private readonly eventChecker: EventsCheckerService,
    private readonly streamEmitter: MqPublisher,
    // private readonly tokenFetcher: TokenFetcherService,
    // private readonly tokenChecker: TokenCheckerService,
    private readonly repository: ChatsRepository
  ) {}

  // async onModuleInit() {
  //   try {
  //     await this.tokenChecker.tryValidateAndUnpackToken(
  //       `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVGSHVmUEw4eEVDaHpDNjAzb2s5cTFRQ3hkUDZxMVlKSE1vSjZpd0pyM00ifQ.eyJzdWIiOiJjaGF0cy1zZXJ2aWNlIiwiYXVkIjoiaW50ZXJuYWwtYXBpIiwicGVybWlzc2lvbnMiOlsiTWVzc2FnZXNTZXJ2aWNlL0dldE1lc3NhZ2VBdXRoSW5mbyJdLCJpYXQiOjE3NjAzNzgxNzIsImV4cCI6MTc2MDM4MTc3MiwiaXNzIjoic2lnbmluZy1zZXJ2aWNlIn0.Y4nM-FvSkkoKewLLXLG50oMVslKaIpaZ4bYRedYtkot1k-mu1aHNoKmrwIbp-mLSgQGOqZctnGiGTxLEUhZ7lA923iw9Tt_PmVmK1Fx5EHep6xgjQl43j6H5iEBlELnD1I9ei9bbeT7PLrsy3pjtnNSQMdP4WQSOmXDuo6Zp_HcNOJhP2FyDd5UrCA4XSvVIctC8RuJI6o6r94IXH-y6FjQhxAh9tXSNJOKDRlpGffwQhhzAHpqQ5X-c20OcQLCD3tICtl70x0Jqbp8ZDLeaRU1ms9CqcsDx3ZHV-qzjJFr853oIA62SnV3t3YDTROaLg-GRD0fsh68tGmSMlRShow`
  //     );
  //
  //     this.logger.info('Fetching test token...');
  //     const token = await this.tokenFetcher.getToken();
  //     this.logger.info({ token }, 'Successfully fetched test token on module init.');
  //     const data = await this.tokenChecker.tryValidateAndUnpackToken(token);
  //     this.logger.info({ data }, 'Successfully checked test token on module init.');
  //   } catch (error) {
  //     this.logger.error({ error }, 'Failed to fetch test token on module init.');
  //   }
  // }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, ChatsService.name);
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
    const existingRecord = await this.repository.getUserChatPermissions(chatId, userId, {
      permissions: true,
      roleId: true,
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
      await this.repository.upsertUserChatPermissions(
        chatId,
        userId,
        { permissions: newPermissions, roleId },
        {
          userId,
          chatId,
          permissions: newPermissions,
          roleId:
            roleId ??
            notNull((await this.repository.getUniqueChat(chatId, { defaultRoleId: true })).defaultRoleId),
        }
      );
      hasChanged = true;
    }

    // --- 2. Handle Membership Status Change ---
    if (action === 'added') {
      const existingMember = await this.repository.getUniqueChatMember(chatId, userId, {
        chatId: true,
        userId: true,
      });
      if (!existingMember) {
        await this.repository.createChatMember(chatId, userId);
        hasChanged = true;
      }
    } else if (action === 'removed') {
      if (await this.repository.deleteChatMember(chatId, userId)) {
        hasChanged = true;
        // Optionally apply a "permissions on leave" policy here if needed
        // const chat = await this.db.transaction.chat.findUnique(...);
        // await this.db.transaction.userChatPermissions.update(...);
      }
    }
    // For 'updated' action, we only care about the permissions change handled above.

    return hasChanged;
  }

  async getUserChatIds(userId: string): Promise<string[]> {
    return (await this.repository.getUserChats(userId, { chatId: true })).map(m => m.chatId);
  }

  async getJoinedChats<S extends Prisma.ChatSelect>(
    userId: string,
    selection?: S
  ): Promise<ChatSelectPayload<S>[]> {
    const memberships = await this.repository.getUserChats(userId, {
      chat: { select: selection },
    });
    return memberships.map(m => m.chat as ChatSelectPayload<S>);
  }

  async getLastMessageEvents({
    messageNn,
    chatId,
    afterNn,
  }: {
    chatId: string;
    messageNn: bigint;
    afterNn: bigint;
  }): Promise<{
    oldestCreatedAt?: Date | undefined;
    events: {
      nn: bigint;
      payload: MessageEventDto['payload'] | undefined;
    }[];
  }> {
    const events = await this.repository.getEventsForMessageSinceNm(chatId, messageNn, afterNn, `asc`, {
      nn: true,
      payload: true,
      createdAt: true,
    });

    return {
      events: events as ({ payload: MessageEventDto['payload'] } & (typeof events)[0])[],
      oldestCreatedAt: events.at(0)?.createdAt,
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
    await this.streamEmitter.publish(eventsRawCreateTopic, candidateEvent, async data => {
      await this.eventChecker.authorizeEvent(data);
      nn = data.nn = await this.repository.popNextChatEventMM(chatId);
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
        const savedEvent = await this.repository.createChatEvent({
          chatId: event.chatId,
          nn: event.nn,
          authorId: event.authorId,
          type: event.type,
          payload: event.payload as Prisma.JsonObject, // Cast payload to the expected type
          createdAt: event.createdAt,
        });

        return {
          savedEvent,
          hasChanges:
            event.type === 'message'
              ? true
              : event.type === 'info'
                ? await this.repository.applyInfoToDB(event.payload, savedEvent)
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
            await this.streamEmitter.publish(
              messagePayload.nn === null ? eventsMessageCreatedTopic : eventsMessagePatchedTopic,
              savedEvent
            );
            break;
          }
          case 'info':
            await this.streamEmitter.publish(eventsInfoPatchedTopic, savedEvent);
            break;

          case 'membership':
            await this.streamEmitter.publish(eventsMembershipChangedTopic, savedEvent);
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
