import { ExMap } from '@gurban/kit/collections/ex-map';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger, IBaseLogger } from '@gurban/kit/interfaces/logger-interface';
import { RedisPubsubSubscription } from '@gurban/kit/redis-pubsub-subscription';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { userMembershipPubsub } from '@poslah/chats-service/topics/user-membership.pubsub-topic';
import {
  messagesUpsertPubsub,
  PubsubMessageDto,
} from '@poslah/messages-service/topics/messages-upsert.pubsub-topic';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { PubSubSubscriberService } from '@poslah/util/modules/pubsub/pubsub-subscriber.service';
import { z } from 'zod/v4';

const createStream = <T>(stream: AsyncIterator<T>, unsub: () => Promise<void>): AsyncIterableIterator<T> => ({
  next: stream.next.bind(stream),
  return: async (value?: unknown) => {
    await unsub();
    return stream.return ? stream.return(value) : { value: undefined, done: true };
  },
  throw: stream.throw?.bind(stream),
  [Symbol.asyncIterator]() {
    return this;
  },
});

type StreamHandler<T> = { stream: AsyncIterator<T>; push: (value: T) => void; end: () => void };

function createPushableStream<T>(): StreamHandler<T> {
  let waiting: ((result: IteratorResult<T>) => void) | null = null;
  const queue: T[] = [];
  let done = false;

  const push = (value: T) => {
    if (done) {
      return;
    }
    if (waiting) {
      waiting({ value, done: false });
      waiting = null;
    } else {
      queue.push(value);
    }
  };

  const end = () => {
    if (done) {
      return;
    }
    done = true;
    if (waiting) {
      waiting({ value: undefined, done: true });
      waiting = null;
    }
  };

  const stream: AsyncIterableIterator<T> = {
    next: () => {
      if (queue.length > 0) {
        return Promise.resolve({ value: queue.shift()!, done: false });
      }
      if (done) {
        return Promise.resolve({ value: undefined, done: true });
      }
      return new Promise<IteratorResult<T>>(resolve => {
        waiting = resolve;
      });
    },
    return: async () => {
      end();
      return { value: undefined, done: true };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return { stream, push, end };
}

/**
 * Represents a user who has subscribed to one or more data streams.
 * The class provides methods to manage and interact with the subscribed streams.
 *
 * @template T The type of data handled by the streams.
 */
class SubscribedUser<T> {
  constructor(private readonly userId: string) {}

  private streams = new Set<StreamHandler<T>>();

  addStream(): StreamHandler<T> {
    const handler = createPushableStream<T>();
    this.streams.add(handler);
    return handler;
  }

  removeStream(handler: StreamHandler<T>) {
    if (this.streams.has(handler)) {
      handler.end();
      this.streams.delete(handler);
    }
  }

  push(data: T) {
    for (const streamControl of this.streams.values()) {
      streamControl.push(data);
    }
  }

  hasStreams(): boolean {
    return this.streams.size > 0;
  }
}

class JoinsTracker {
  constructor(
    private readonly logger: IBaseLogger,
    public readonly userId: string,
    private readonly chatsGRPCClient: ChatsGRPCClient,
    private readonly rebuildChatsToUsersMapping: () => void
  ) {}

  public joins = new Set<string /* chatId */>();

  private pendingUpdates: z.infer<typeof userMembershipPubsub.schema>[] = [];
  private fetchingPromise = Promise.resolve();
  private fetching = false;

  /**
   * Always enqueue a fetch operation after the current one to maintain a correct list
   * in situations alike:
   * [grpc call start ->
   *      unsubscribe -> <missing events> -> subscribe
   * -> grpc call end] => <new-fetch>
   */
  private fetch() {
    return (this.fetchingPromise = this.fetchingPromise.then(async () => {
      // pendingUpdates is empty there since it cleaned at finally-block.
      this.fetching = true; // start queueing any new incoming updates
      try {
        this.joins = await this.chatsGRPCClient.getUserChatIds(this.userId);
      } catch (error) {
        this.logger.error({ error }, `Error fetching getUserChatIds(${this.userId})`);
      } finally {
        const updatesToApply = this.pendingUpdates.splice(0);
        this.fetching = false;
        this.applyUpdates(updatesToApply);
      }
    }));
  }

  /**
   * Applies an incremental update to the user's chat memberships.
   * @param updates The details of the membership changes.
   */
  applyUpdates(updates: z.infer<typeof userMembershipPubsub.schema>[]) {
    if (this.fetching) {
      this.pendingUpdates.push(...updates);
    } else {
      for (const update of updates) {
        if (update.action === 'join') {
          this.joins.add(update.chatId);
        } else {
          this.joins.delete(update.chatId);
        }
      }
      this.rebuildChatsToUsersMapping();
    }
  }

  async initialize() {
    await this.fetch();
  }
}

export type MessagesSubscriptionPayload = {
  messagesSubscription: PubsubMessageDto;
};

@Injectable()
export class SubscriptionsService implements OnModuleInit, OnModuleDestroy {
  private readonly messagesSubscription: RedisPubsubSubscription;
  private readonly membershipSubscription: RedisPubsubSubscription;

  constructor(
    private readonly chatsGRPCClient: ChatsGRPCClient,
    private readonly loggerBase: Logger,
    private readonly pubsubSubscriber: PubSubSubscriberService
  ) {
    this.messagesSubscription = new RedisPubsubSubscription(
      this.loggerBase,
      this.pubsubSubscriber,
      messagesUpsertPubsub.name,
      {
        onMessage: message => {
          const messageData = messagesUpsertPubsub.schema.parse(JSON.parse(message));

          const userIds = this.usersByChat.get(messageData.chatId);
          if (userIds) {
            this.logger.info(`Pushing message to ${userIds.size} users in chat ${messageData.chatId}`);
            for (const userId of userIds) {
              this.usersSubscribedToMessages.get(userId)?.push({ messagesSubscription: messageData });
            }
          }
        },
        onError: (error, message) => {
          this.logger.error({ error, message }, 'Failed to process messages-upsert message');
        },
      }
    );

    this.membershipSubscription = new RedisPubsubSubscription(
      this.loggerBase,
      this.pubsubSubscriber,
      userMembershipPubsub.name,
      {
        onSubscribed: () => {
          this.logger.info('Reconnected to Redis. Refreshing all active join trackers.');
          for (const tracker of this.joinsTrackers.values()) {
            // Re-fetch the full list for all active trackers to ensure consistency
            void tracker.initialize();
          }
        },
        onMessage: message => {
          // Expecting a more detailed message: { userId, chatId, type: 'join' | 'leave' }
          const updatePayload = userMembershipPubsub.schema.parse(JSON.parse(message));
          this.joinsTrackers.get(updatePayload.userId)?.applyUpdates([updatePayload]);
        },
        onError: (error, message) => {
          this.logger.error({ error, message }, 'Failed to process user-memberships message');
        },
      }
    );
  }

  async onModuleInit() {
    await this.messagesSubscription.activate();
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SubscriptionsService.name);
  }

  private joinsTrackers = new ExMap<string, JoinsTracker>();

  private usersSubscribedToMessages = new ExMap<string, SubscribedUser<MessagesSubscriptionPayload>>();
  /// future example:
  // private usersSubscribedToEvents = new ExMap<string, SubscribedUser<EventDTO>>();

  private isUserNeedsJoinsTracking(userId: string) {
    return this.usersSubscribedToMessages.has(userId); // || this.subscribedToEVentsUsers.has(userId);
  }

  private usersByChat = new ExMap<string /* chatId */, Set<string /* userId */>>();

  private rebuildChatsToUsersMapping() {
    const usersByChat = new ExMap<
      Parameters<typeof this.usersByChat.set>[0],
      Parameters<typeof this.usersByChat.set>[1]
    >();
    for (const [userId, tracker] of this.joinsTrackers.entries()) {
      for (const chatId of tracker.joins) {
        usersByChat.update(chatId, (users = new Set()) => users.add(userId));
      }
    }
    this.usersByChat = usersByChat;
  }

  private async createJoinsTrackerIfNotExist(userId: string) {
    if (this.joinsTrackers.has(userId)) {
      return;
    }

    const wasEmpty = this.joinsTrackers.size === 0;

    const tracker = new JoinsTracker(this.logger, userId, this.chatsGRPCClient, () =>
      this.rebuildChatsToUsersMapping()
    );
    await tracker.initialize();
    this.joinsTrackers.set(userId, tracker);

    this.rebuildChatsToUsersMapping();

    if (wasEmpty) {
      await this.membershipSubscription.activate();
    }
  }

  private async removeJoinTrackerIfNotNeeded(userId: string) {
    if (this.isUserNeedsJoinsTracking(userId)) {
      return;
    }

    const existing = this.joinsTrackers.get(userId);
    if (existing) {
      this.joinsTrackers.delete(userId);
      this.rebuildChatsToUsersMapping();
    } else {
      this.logger.error(`Existing join tracker is not found for ${userId}`);
    }

    if (this.joinsTrackers.size === 0) {
      await this.membershipSubscription.deactivate();
    }
  }

  async subscribeToMessages(
    userId: string,
    type: 'messagesSubscription'
  ): Promise<AsyncIterable<MessagesSubscriptionPayload>> {
    this.logger.info(`User ${userId} subscribed to ${type}`);

    let user = this.usersSubscribedToMessages.get(userId);
    if (!user) {
      user = new SubscribedUser<MessagesSubscriptionPayload>(userId);
      this.usersSubscribedToMessages.set(userId, user);
      this.logger.info(`Created new SubscribedUser for ${userId}`);

      await this.createJoinsTrackerIfNotExist(userId);
    }

    const handler = user.addStream();

    const unsub = async () => {
      this.logger.info(`User ${userId} unsubscribed from ${type}`);
      const userToUnsub = this.usersSubscribedToMessages.get(userId);
      if (userToUnsub) {
        userToUnsub.removeStream(handler);
        if (!userToUnsub.hasStreams()) {
          this.usersSubscribedToMessages.delete(userId);
          this.logger.info(`Removed SubscribedUser for ${userId} as they have no more streams`);

          await this.removeJoinTrackerIfNotNeeded(userId);
        }
      }
    };

    return createStream(handler.stream, unsub);
  }

  async onModuleDestroy() {
    await this.membershipSubscription.deactivate();
    await this.messagesSubscription.deactivate();
  }
}
