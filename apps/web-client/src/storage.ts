import { ApolloClient, OperationVariables } from '@apollo/client/core';
import { disposers, FunctionDisposable, ObjectDisposable } from '@gurban/kit/core/disposers';
import { JsonObject } from '@gurban/kit/core/json-type.ts';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { attachmentInfoSchema, forwardInfoSchema } from '@poslah/chats-service/entities/raw-event-schema.ts';
import { messageSchema } from '@poslah/messages-service/modules/messages/messages-db.ts';
import { computed } from 'mobx';
import {
  applySnapshot,
  isoStringToDateTransform,
  Model,
  model,
  prop,
  SnapshotInOf,
  stringToBigIntTransform,
} from 'mobx-keystone';
import { Subscription } from 'rxjs';
import { z } from 'zod';

import {
  AllMessagesSubscriptionDocument,
  AllMessagesSubscriptionSubscription,
  AllMessagesSubscriptionSubscriptionVariables,
} from './graphql/messages.generated.tsx';
import { getGraphqlClient, setGraphqlClient } from './storage-contexts.ts';

type StaticAssert<T extends true> = T;

type AssertExtends<T, U extends T> = T extends U ? true : false;

@model(`poslah/AttachmentInfo`)
class AttachmentInfoStore extends Model({
  fileId: prop<string>().withSetter(),
  mimeType: prop<string>().withSetter(),
  url: prop<string>().withSetter(),
  filename: prop<string>().withSetter(),
  size: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  metadata: prop<Record<string, unknown> | null>(null).withSetter(),
}) {
  static fromRaw(data: JsonObject) {
    const parsed = attachmentInfoSchema.parse(data);
    return new AttachmentInfoStore({ ...parsed });
  }
}

export type AttachmentInfoGuard = StaticAssert<
  AssertExtends<z.input<typeof attachmentInfoSchema>, SnapshotInOf<AttachmentInfoStore>>
>;

@model(`poslah/ForwardInfo`)
class ForwardInfoStore extends Model({
  chatId: prop<string>().withSetter(),
  nn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  text: prop<string | null>(null).withSetter(),
  authorId: prop<string>().withSetter(),
  createdAt: prop<string>().withTransform(isoStringToDateTransform()).withSetter(),
  attachments: prop<AttachmentInfoStore[]>(() => []).withSetter(),
}) {
  static fromRaw(data: JsonObject) {
    const parsed = forwardInfoSchema.parse(data);
    return new ForwardInfoStore({
      ...parsed,
      attachments: parsed.attachments?.map(a => new AttachmentInfoStore(a)),
    });
  }
}

export type ForwardInfoGuard = StaticAssert<
  AssertExtends<z.input<typeof forwardInfoSchema>, SnapshotInOf<ForwardInfoStore>>
>;

@model(`poslah/Message`)
class MessageStore extends Model({
  nn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  chatId: prop<string>().withSetter(),
  eventNn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  authorId: prop<string>().withSetter(),
  text: prop<string | null>().withSetter(),
  replyToNn: prop<string | null>().withTransform(stringToBigIntTransform()).withSetter(),
  attachments: prop<AttachmentInfoStore[] | null>().withSetter(),
  forwarded: prop<ForwardInfoStore[] | null>().withSetter(),
  createdAt: prop<string>().withTransform(isoStringToDateTransform()).withSetter(),
  updatedAt: prop<string>().withTransform(isoStringToDateTransform()).withSetter(),
  deletedAt: prop<string | null>().withTransform(isoStringToDateTransform()).withSetter(),
  editedAt: prop<string | null>().withTransform(isoStringToDateTransform()).withSetter(),
  editedNn: prop<string | null>().withTransform(stringToBigIntTransform()).withSetter(),
}) {
  static fromRaw(data: JsonObject) {
    const parsed = messageSchema.parse(data);
    return new MessageStore({
      ...parsed,
      attachments: parsed.attachments?.map(a => new AttachmentInfoStore(a)) ?? null,
      forwarded:
        parsed.forwarded?.map(
          a =>
            new ForwardInfoStore({
              ...a,
              attachments: a.attachments?.map(b => new AttachmentInfoStore(b)) ?? null,
            })
        ) ?? null,
    });
  }
}

export type MessageTypeGuard = StaticAssert<
  AssertExtends<z.input<typeof messageSchema>, SnapshotInOf<MessageStore>>
>;

class StoreLifecycle {
  constructor(private readonly disposables: readonly (FunctionDisposable | ObjectDisposable)[]) {}

  private destructor?: () => void;

  public get initialized() {
    return !!this.destructor;
  }

  init() {
    if (this.destructor) {
      return;
    }

    this.destructor = disposers(this.disposables);
  }

  destroy() {
    if (this.destructor) {
      this.destructor();
      this.destructor = undefined;
    }
  }
}

class SubscriptionStore<TData, TVariables extends OperationVariables> extends StoreLifecycle {
  constructor(
    private readonly client: () => ApolloClient,
    private readonly options: ApolloClient.SubscribeOptions<TData, TVariables>,
    private readonly handlers: {
      onData: (data: TData) => void;
      onError: (error: unknown) => void;
    }
  ) {
    super([
      () => {
        this.subscribe();
        return () => {
          this.unsubscribe();
        };
      },
    ]);
  }

  private subscription?: Subscription;

  get subscribed() {
    return !!this.subscription;
  }

  subscribe() {
    console.log(`subscribe`);
    if (this.subscription) {
      return;
    }

    const observable = notNull(this.client()).subscribe<TData, TVariables>(this.options);

    this.subscription = observable.subscribe({
      // This is called every time the server sends data
      next: response => {
        if (response.data) {
          this.handlers.onData(response.data);
        }
      },

      // This is called if an error occurs
      error: err => {
        this.handlers.onError(err);
      },

      complete: () => {
        this.unsubscribe(); /// TODO am i need this? this seems safer than "this.subscription = undefined"
      },
    });
  }

  unsubscribe() {
    console.log(`unsubscribe`);
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}

type RootStorageArgs = {
  client: ApolloClient;
};

@model(`poslah/ChatsStorage`)
export class ChatsStorage extends Model({
  messagesLog: prop<AllMessagesSubscriptionSubscription[]>(() => []),
}) {
  @computed
  get client() {
    return getGraphqlClient(this);
  }

  readonly messagesSubscription = new SubscriptionStore<
    AllMessagesSubscriptionSubscription,
    AllMessagesSubscriptionSubscriptionVariables
  >(
    () => this.client,
    { query: AllMessagesSubscriptionDocument },
    {
      onData: data => {
        this.messagesLog.push(data);
        console.log(data);
      },
      onError: err => {
        console.error(err);
      },
    }
  );

  protected onAttachedToRootStore(): (() => void) | void {
    console.log(`onAttachedToRootStore`);
    return disposers([this.messagesSubscription]);
  }
}

@model(`poslah/RootStorage`)
export class RootStorage extends Model({
  chat: prop(() => new ChatsStorage({})),
}) {
  private static tempArgs?: RootStorageArgs;

  static withArgs(data: SnapshotInOf<RootStorage>, args: RootStorageArgs) {
    const oldArgs = this.tempArgs;
    this.tempArgs = args;
    const o = new RootStorage({});
    this.tempArgs = oldArgs;
    applySnapshot(o, data);
    return o;
  }

  protected onInit() {
    const args = notNull(
      RootStorage.tempArgs,
      () => `You should create RootStorage with RootStorage.whitArgs(args)`
    );
    setGraphqlClient(this, args.client);
  }
}

// usage: const storage = RootStorage.withArgs({}, {client});
