import { ApolloClient, OperationVariables } from '@apollo/client';
import { ExMap } from '@gurban/kit/collections/ex-map';
import { disposers, FunctionDisposable, ObjectDisposable } from '@gurban/kit/core/disposers';
import type { JsonObject } from '@gurban/kit/core/json-type.ts';
import { notNull } from '@gurban/kit/utils/flow/flow-utils.ts';
import { PromiseController } from '@gurban/kit/utils/promise-util.ts';
import {
  attachmentInfoSchema,
  forwardInfoSchema,
  messageSchema,
} from '@poslah/util/schemas/message.schema.ts';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import {
  applySnapshot,
  ExtendedModel,
  idProp,
  isoStringToDateTransform,
  Model,
  model,
  modelAction,
  objectToMapTransform,
  prop,
  Ref,
  rootRef,
  SnapshotInOf,
  stringToBigIntTransform,
} from 'mobx-keystone';
import type { Subscription } from 'rxjs';
import { z } from 'zod/v4';

import {
  AllMessagesSubscriptionDocument,
  AllMessagesSubscriptionSubscription,
  AllMessagesSubscriptionSubscriptionVariables,
  JoinedChatsDocument,
  JoinedChatsQuery,
  JoinedChatsQueryVariables,
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

@model(`poslah/MessageDraft`)
export class MessageDraftStore extends Model({
  text: prop<string | null>().withSetter(),
  replyToNn: prop<string | null>().withTransform(stringToBigIntTransform()).withSetter(),
  attachments: prop<AttachmentInfoStore[] | null>().withSetter(),
  forwarded: prop<ForwardInfoStore[] | null>().withSetter(),
}) {
  get empty() {
    return !this.text && !this.replyToNn && !this.attachments?.length && !this.forwarded?.length;
  }
}

@model(`poslah/Message`)
class MessageStore extends ExtendedModel(MessageDraftStore, {
  nn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  chatId: prop<string>().withSetter(),
  eventNn: prop<string>().withTransform(stringToBigIntTransform()).withSetter(),
  authorId: prop<string>().withSetter(),
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

type FetchingStoreHandlers<TData, TVariables extends OperationVariables> = {
  onStart?: (options: ApolloClient.QueryOptions<TData, TVariables>) => void;
  onData?: (data: TData, options: ApolloClient.QueryOptions<TData, TVariables>) => void;
  onError?: (error: unknown, options: ApolloClient.QueryOptions<TData, TVariables>) => void;
  onCancel?: (reason: string, options: ApolloClient.QueryOptions<TData, TVariables>) => void;
  onHandlerError?: (error: unknown, kind: keyof FetchingStoreHandlers<unknown, OperationVariables>) => void;
};

const logUnhandled = (e: unknown, kind: keyof FetchingStoreHandlers<unknown, OperationVariables>) => {
  console.error(`Unhandled exception from ${kind} callback:`, e);
};

const safeHandlerCall = (
  fn: () => void,
  kind: keyof FetchingStoreHandlers<unknown, OperationVariables>,
  onHandlerError?: (error: unknown, kind: keyof FetchingStoreHandlers<unknown, OperationVariables>) => void
) => {
  try {
    fn();
  } catch (e) {
    if (onHandlerError) {
      try {
        onHandlerError(e, kind);
      } catch (e) {
        logUnhandled(e, `onHandlerError`);
      }
    } else {
      logUnhandled(e, kind);
    }
  }
};

export class FetchingStore<TData, TVariables extends OperationVariables> extends StoreLifecycle {
  constructor(
    private readonly client: () => ApolloClient,
    private readonly getOptions: () => ApolloClient.QueryOptions<TData, TVariables>,
    private readonly handlers: FetchingStoreHandlers<TData, TVariables>
  ) {
    super([
      () => () => this.cancel(`destroy`),
      () =>
        reaction(
          () => Object.entries(this.options),
          () => void this.cancel(`options-change`).fetch(),
          { fireImmediately: true, name: `FetchingStore-auto-fetch` }
        ),
    ]);

    makeObservable(this);
  }

  @computed
  get options() {
    return this.getOptions();
  }

  private fetching?: {
    promise: Promise<void>;
    cancel(reason: string): void;
  };

  async fetch() {
    if (this.fetching) {
      return this.fetching.promise;
    }

    const { options } = this;

    const { onStart, onHandlerError } = this.handlers;
    onStart && safeHandlerCall(() => onStart(options), `onStart`, onHandlerError);

    const controller = new PromiseController();

    return (this.fetching = {
      promise: (async () => {
        const { onData, onError } = this.handlers;
        try {
          const response = await notNull(this.client()).query<TData, TVariables>(options);
          if (!controller.aborted) {
            const { error, data } = response;
            if (error) {
              onError && safeHandlerCall(() => onError(error, options), `onError`, onHandlerError);
            } else if (data) {
              onData && safeHandlerCall(() => onData(data, options), `onData`, onHandlerError);
            }
          }
        } catch (error) {
          if (!controller.aborted) {
            onError && safeHandlerCall(() => onError(error, options), `onError`, onHandlerError);
          }
        } finally {
          if (!controller.aborted) {
            this.fetching = undefined;
          }
        }
      })(),
      cancel: (reason: string) => {
        const { onCancel } = this.handlers;
        onCancel && safeHandlerCall(() => onCancel(reason, options), `onCancel`, onHandlerError);
        controller.abort(reason);
      },
    }).promise;
  }

  cancel(reason: string) {
    if (this.fetching) {
      this.fetching.cancel(reason);
      this.fetching = undefined;
    }
    return this;
  }
}

class MutatingStore<TData, TVariables extends OperationVariables> extends StoreLifecycle {
  constructor(
    readonly client: () => ApolloClient,
    readonly getOptions: () => Omit<ApolloClient.MutateOptions<TData, TVariables>, `variables`>
  ) {
    super();
  }

  @computed.struct
  get options() {
    return this.getOptions();
  }

  execute(variables: TVariables) {
    if (this.executing) {
      throw new Error(`already executing`);
    }
    this.executing = {
      promise: notNull(this.client()).mutate({ variables, ...this.options }),
    };
  }
}

export class StatefulFetchingStore<TData, TVariables extends OperationVariables> extends FetchingStore<
  TData,
  TVariables
> {
  constructor(
    client: () => ApolloClient,
    getOptions: () => ApolloClient.QueryOptions<TData, TVariables>,
    private readonly selfOptions: {
      clear: boolean;
    },
    {
      onStart,
      onCancel,
    }: Partial<Pick<FetchingStoreHandlers<TData, TVariables>, `onStart` | `onCancel`>> = {}
  ) {
    super(client, getOptions, {
      onStart: options => {
        this.setLoading(true);
        if (selfOptions.clear) {
          this.setResult(null, null);
        }
        onStart?.(options);
      },
      onCancel: (reason, options) => {
        this.setLoading(false);
        if (selfOptions.clear) {
          this.setResult(null, null);
        }
        onCancel?.(reason, options);
      },
      onData: data => {
        this.setLoading(false);
        this.setResult(data, null);
      },
      onError: error => {
        this.setLoading(false);
        this.setResult(null, error);
      },
    });

    makeObservable(this);
  }

  @observable
  protected data?: TData;

  @observable
  protected error: unknown;

  @observable
  protected loading: boolean = false;

  @action
  private setLoading(loading: boolean) {
    this.loading = loading;
  }

  @action
  protected setResult(data: TData | null, error: unknown | null) {
    if (error) {
      this.error = error;
      if (this.selfOptions.clear) {
        this.data = undefined;
      }
    } else if (data) {
      this.error = undefined;
      this.data = data;
    } else {
      if (this.selfOptions.clear) {
        this.data = undefined;
      }
      this.error = undefined;
    }
  }

  @computed.struct
  get result() {
    const { data, error, loading } = this;
    return { data, error, loading };
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
        if (response.error) {
          this.handlers.onError(response.error);
        } else if (response.data) {
          this.handlers.onData(response.data);
        }
      },

      // This is called if an error occurs
      error: err => {
        this.handlers.onError(err);
      },

      complete: () => {
        this.unsubscribe();
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

@model(`poslah/Chat`)
class ChatStore extends Model({
  id: idProp,
  title: prop<string>(),
  bio: prop<string>(() => ``),
  draft: prop<MessageDraftStore>(
    () => new MessageDraftStore({ text: ``, attachments: null, forwarded: null, replyToNn: null })
  ),
}) {
  static ref = rootRef<ChatStore>(`poslah/ChatRef`);
}

@model(`poslah/ChatsStorage`)
export class ChatsStorage extends Model({
  chats: prop<Record<string, ChatStore>>(() => ({})).withTransform(objectToMapTransform()),
  messagesDrafts: prop<Record<string, MessageDraftStore>>(() => ({})).withTransform(objectToMapTransform()),
  selectedChatId: prop<Ref<ChatStore> | null>(null),
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
        console.log(data);
        this.pushMessageLog(data);
      },
      onError: err => {
        console.error(err);
      },
    }
  );

  readonly joinedChatsFetcher = new FetchingStore<JoinedChatsQuery, JoinedChatsQueryVariables>(
    () => this.client,
    () => ({ query: JoinedChatsDocument }),
    {
      onData: ({ joinedChats }) => {
        this.mergeChats(joinedChats);
        this.setLoadingError(undefined);
        console.log(joinedChats);
      },
      onError: err => {
        this.setLoadingError(err);
        console.error(err);
      },
    }
  );

  @modelAction
  pushMessageLog(data: AllMessagesSubscriptionSubscription) {
    this.messagesLog.push(data);
  }

  @observable loadingError?: unknown;

  @action
  setLoadingError(error: unknown) {
    this.loadingError = error;
  }

  @modelAction
  mergeChats(chats: JoinedChatsQuery['joinedChats']) {
    const chatsById = ExMap.mappedBy(chats, c => c.id);
    for (const chatId of Object.keys(this.chats)) {
      if (!chatsById.has(chatId)) {
        this.chats.delete(chatId);
      }
    }
    for (const chat of chats) {
      const old = this.chats.get(chat.id);
      if (old) {
        applySnapshot(old, chat);
      } else {
        this.chats.set(chat.id, new ChatStore(chat));
      }
    }

    if (!this.selectedChatId || !chatsById.has(this.selectedChatId.id)) {
      this.selectedChatId = chats.length ? ChatStore.ref(chats[0].id) : null;
      // console.log(this.selectedChatId);
    }
  }

  @modelAction
  getOrCreateDraft(chatId: string) {
    const draft = this.messagesDrafts.get(chatId);
    if (draft) {
      return draft;
    }
    const newDraft = new MessageDraftStore({ text: ``, replyToNn: null, attachments: null, forwarded: null });
    this.messagesDrafts.set(chatId, newDraft);
    return newDraft;
  }

  protected onAttachedToRootStore(): (() => void) | void {
    return disposers([this.messagesSubscription, this.joinedChatsFetcher]);
  }
}

@model(`poslah/RootStorage`)
export class RootStorage extends Model({
  chats: prop(() => new ChatsStorage({})),
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
