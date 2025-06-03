import { notNull, uidGenerator } from '@freyja/kit';
import { AnyVariables, GraphQLRequest, OperationResult } from '@urql/core';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';

import { getPromiseWithCancel, PromiseMaybeWithCancel, PromiseWithCancel } from '../../requester';

export class MemoizedRequestState<T, V extends AnyVariables> {
  constructor(
    readonly options: {
      readonly cancellable: boolean;
      readonly autorun: boolean;
    },
    readonly createRequest: () => GraphQLRequest<T, V>,
    readonly execute: (r: GraphQLRequest<T, V>) => PromiseMaybeWithCancel<OperationResult<T, V>>
  ) {
    makeObservable(this);
  }

  @observable
  private enqueuedRequest?: GraphQLRequest<T, V> = undefined;

  private disposer?: () => void;

  readonly uid = `${uidGenerator()}:autorun=${this.options.autorun}`;

  @action
  init() {
    if (!this.disposer && this.options.autorun) {
      this.disposer = reaction(
        () => this.request,
        r => {
          this.enqueuedRequest = r;
          if (this.options.cancellable) {
            this.cancel();
            this.startEnqueuedRequest();
          } else if (!this.executing) {
            this.startEnqueuedRequest();
          }
        },
        { fireImmediately: true }
      );
    }
  }

  @action
  destroy() {
    if (this.disposer) {
      try {
        this.disposer();
      } finally {
        this.disposer = undefined;
      }
    }
    if (this.executing) {
      try {
        this.cancel();
      } finally {
        this.executing = undefined;
      }
    }
  }

  @action
  private startEnqueuedRequest() {
    const { enqueuedRequest } = this;
    if (!enqueuedRequest) {
      return;
    }
    if (this.executing) {
      throw new Error(`already executing`);
    }
    const key = { __uid: uidGenerator() }; // Object.create(null);
    const pwc = getPromiseWithCancel(this.execute(enqueuedRequest));
    pwc.promise = pwc.promise
      .catch(e => {
        if (this.executing?.key === key) {
          this.setResult({ errors: [e] });
        }
        throw e;
      })
      .then(result => {
        if (this.executing?.key === key) {
          this.setResult({ data: result.data, errors: result.error && [result.error] });
        }
        return result;
      })
      .finally(() => {
        if (this.executing?.key === key) {
          runInAction(() => {
            this.executing = undefined;
          });
        }

        if (this.options.autorun && !this.options.cancellable) {
          this.startEnqueuedRequest();
        }
      });

    // if (this.options.autorun && !this.options.cancellable) {
    //   pwc.promise = pwc.promise.finally(() => this.startEnqueuedRequest());
    // }

    this.executing = { pwc: pwc, key, sentRequest: enqueuedRequest };
    this.enqueuedRequest = undefined;

    return pwc.promise;
  }

  @action
  run() {
    this.enqueuedRequest = this.request;
    if (!this.executing) {
      this.startEnqueuedRequest();
    } else if (this.options.cancellable) {
      this.cancel();
      this.startEnqueuedRequest();
    }
    return notNull(this.executing).pwc.promise;
  }

  @action
  cancel() {
    if (!this.options.cancellable) {
      throw new Error(`non-cancellable request cancelled`);
    }
    if (this.executing) {
      this.executing.pwc.cancel?.();
      this.executing = undefined;
    }
  }

  @action
  private setResult(result: { readonly errors?: unknown[]; readonly data?: T }) {
    this.result = makeObservable(
      {
        errors: undefined,
        data: undefined,
        ...result,
        completedAt: new Date(),
      },
      { data: true, errors: true, completedAt: false }
    );
  }

  @observable.ref
  private executing?: {
    readonly pwc: PromiseWithCancel<OperationResult<T, V>>;
    readonly key: unknown;
    readonly sentRequest: GraphQLRequest<T, V>;
  } = undefined;

  @computed
  get loading() {
    return this.executing != null;
  }

  @observable.ref
  result?: {
    readonly errors?: unknown[];
    readonly data?: T;
    readonly completedAt: Date;
  } = undefined;

  @computed.struct
  private get request() {
    return this.createRequest();
  }
}
