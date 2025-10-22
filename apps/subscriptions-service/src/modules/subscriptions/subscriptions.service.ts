import { ExMap } from '@gurban/kit/collections/ex-map';
import { once } from '@gurban/kit/core/once';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ChatsGRPCClient } from '@poslah/chats-service/grpc/chats.grpc-client';
import { userMembershipPubsub } from '@poslah/chats-service/topics/user-membership-pubsub.topic';
import { RedisSubscriptionService } from '@poslah/database/redis/redis.service';
import {
  messagesUpsertPubsub,
  PubsubMessageDto,
} from '@poslah/messages-service/topics/messages-upsert-pubsub.topic';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

import { RedisPubsubSubscription } from './redis-pubsub-subscription';

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
    public readonly userId: string,
    private readonly chatsGRPCClient: ChatsGRPCClient,
    private readonly rebuildChatsToUsersMapping: () => void
  ) {}

  public joins = new Set<string /* chatId */>();

  async update() {
    this.joins = await this.chatsGRPCClient.getUserChatIds(this.userId);
    this.rebuildChatsToUsersMapping();
  }

  async initialize() {
    this.joins = await this.chatsGRPCClient.getUserChatIds(this.userId);
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
    private readonly redisSubscriptionService: RedisSubscriptionService
  ) {
    this.messagesSubscription = new RedisPubsubSubscription(
      this.loggerBase,
      this.redisSubscriptionService,
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
      this.redisSubscriptionService,
      userMembershipPubsub.name,
      {
        onMessage: message => {
          const { userId } = userMembershipPubsub.schema.parse(JSON.parse(message));
          void this.joinsTrackers.get(userId)?.update();
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

    const tracker = new JoinsTracker(userId, this.chatsGRPCClient, () => this.rebuildChatsToUsersMapping());
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
