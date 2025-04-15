import { ApolloError, NetworkStatus } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { pickBy } from 'lodash';
import { action, comparer, computed, IComputedValue, makeObservable, observable, reaction } from 'mobx';

import { isPromise } from '../utils/async-utils';
import { notNull } from '../utils/flow-utils';
import { addReturn, mergeFunctions } from '../utils/functions-utils';
import { Nullish } from '../utils/types';
import { FunctionsQueue } from './functions-queue';

export class Cancelled extends Error {
  constructor(
    readonly reason?: CancelPayload,
    readonly info?: CancelPayload
  ) {
    super(`request cancelled; reason: ${JSON.stringify(reason)}; info: ${JSON.stringify(info)}`);
  }
}

export type CancelPayload = string | Record<string, unknown>;

type CancelPayloadInput<R> = CancelPayload | ((req: Readonly<RequestState<R>>) => CancelPayload);

type PromiseWithCancel<T, R> = { promise: Promise<T>; cancel(reason?: CancelPayloadInput<R>): void };

export class GraphQLFailure<Data> extends Error {
  constructor(
    readonly error: ApolloError | readonly GraphQLError[] | undefined,
    readonly data: Partial<Data>,
    readonly networkStatus: NetworkStatus
  ) {
    super(`GraphQL Failure`);
  }
}

const fakeTypeCheck = <T>(o: unknown): o is T => true;

/**
 * Life of single async request - it have promise whose life can be cancelled, and eventually become done when client
 * cancelled execution or promise has been settled. Going back (e.g. 'un-done' or 'un-cancel') is not allowed.
 *
 * Don't forget to call cancel() for good shutdown.
 */
export class RequestState<R> {
  constructor(promise: Promise<R>) {
    makeObservable(this);
    this.promise = promise.finally(() => this.setDone());
  }

  readonly promise: Promise<R>;

  @observable
  private _cancelled = false;

  @observable
  private _done = false;

  get done() {
    return this._done;
  }

  get cancelled() {
    return this._cancelled;
  }

  private cancelPromiseActivation?: { resolve(v: unknown): void; reject(e: unknown): void };

  public readonly cancelPromise = new Promise((resolve, reject) => {
    this.cancelPromiseActivation = { resolve, reject };
  });

  private readonly controller = new AbortController();

  get signal() {
    return this.controller.signal;
  }

  @action
  private setCancelling(reason?: CancelPayload) {
    if (this.done) {
      throw new Error(`can not cancel done request`);
    }
    this._done = true;
    this._cancelled = true;
    this.controller.abort(reason);
    notNull(this.cancelPromiseActivation).reject(reason);
  }

  @action
  private setDone() {
    this._done = true;
    notNull(this.cancelPromiseActivation).resolve(undefined);
  }

  @action.bound
  cancel(reason?: CancelPayload) {
    if (!this.done) {
      this.setCancelling(reason);
    }
    return this;
  }

  private async getCancel<T>(cancel: ((e?: CancelPayloadInput<T>) => unknown) | Nullish) {
    try {
      return await this.cancelPromise;
    } catch (error) {
      if (fakeTypeCheck<CancelPayload>(error)) {
        cancel?.(error); // cancel-function can throw cancel-exception by itself, so it will win in race
      }
      throw error; // but if it's not, throw it
    }
  }

  private race<T>(promise: Promise<T>, cancel?: ((e?: CancelPayloadInput<T>) => unknown) | Nullish) {
    return Promise.race([this.getCancel(cancel), promise]) as Promise<T>;
  }

  stage<T>(p: Promise<T> | PromiseWithCancel<T, T>): Promise<T> {
    return isPromise(p) ? this.race(p) : this.race(p.promise, p.cancel);
  }
}

export class CancellableRequest {
  constructor() {
    makeObservable(this);
  }

  @observable.ref
  private state?: RequestState<unknown>;

  get context() {
    return this.state;
  }

  @action.bound
  cancel() {
    return this.state?.cancel();
  }

  destroy = () => {
    this.cancel();
  };

  @action.bound
  request<R>(
    procedure: (ctx: Readonly<RequestState<R>>) => Promise<R> | PromiseWithCancel<R, R>,
    options?: { waitForCancelled?: boolean }
  ): Promise<R> {
    const old = this.state;
    const wait =
      (old &&
        !old.done &&
        (old.cancel(`by CancellableRequest`),
        options?.waitForCancelled && old.promise.catch(() => /* mute */ null))) ||
      Promise.resolve();

    const request: RequestState<R> = new RequestState(
      wait.then(() =>
        // stage() will "drop" procedure even if not respects cancel-controller
        request.stage(procedure(request))
      )
    );

    return (this.state = request).promise;
  }

  @action.bound
  async execute<R>(
    req: (ctx: Readonly<RequestState<unknown>>) => Promise<R> | PromiseWithCancel<R, R>,
    success: (d: R) => void,
    fail: (e: unknown) => void,
    opt?: { catchCancelled: boolean }
  ) {
    try {
      success(await this.request(req));
    } catch (error) {
      if (error instanceof Cancelled) {
        opt?.catchCancelled && fail(error);
      } else {
        fail(error);
      }
    }
  }

  @computed get loading() {
    return this.context?.done === false;
  }
}

type QueryFn<T> = (ctx: Readonly<RequestState<unknown>>, currentData: () => Readonly<T | null>) => Promise<T>;

export class CustomStatefulRequest<T, E> {
  constructor(
    getQuery: CustomStatefulRequest<T, E>[`getQuery`],
    transformError: CustomStatefulRequest<T, E>[`transformError`]
  ) {
    this.getQuery = getQuery;
    this.transformError = transformError;
    makeObservable(this);
  }

  @observable.ref getQuery: IComputedValue<QueryFn<T> | null>;

  @observable.ref transformError: (e: unknown) => E;

  @action.bound setup(part: Partial<Pick<this, `getQuery` | `transformError`>>) {
    Object.assign(
      this,
      pickBy(part, v => v !== undefined)
    );
  }

  @observable data: T | null = null;
  @observable error: E | null = null;

  @action.bound
  setState(data: this[`data`], error: this[`error`]) {
    this.data = data;
    this.error = error;
    return this;
  }

  @action.bound
  resetData() {
    this.data = null;
    return this;
  }

  @action.bound
  resetError() {
    this.error = null;
    return this;
  }

  readonly request = new CancellableRequest();

  @computed({ equals: comparer.identity }) get query() {
    return this.getQuery.get();
  }

  @action.bound
  async fetch() {
    const { query } = this;
    if (query) {
      return this.request.execute(
        ctx => {
          return query(ctx, () => this.data);
        },
        data => {
          this.setState(data, null);
        },
        error => {
          this.setState(null, this.transformError(error));
        }
      );
    } else {
      this.request.cancel();
    }
  }

  get loading() {
    return this.request.loading;
  }

  readonly destructors = new FunctionsQueue(this.request.cancel);
  readonly destroy = this.destructors.fire;

  init = addReturn(
    mergeFunctions(() => {
      this.destructors.add(
        reaction(
          () => this.query,
          () => void this.fetch(),
          { fireImmediately: true }
        )
      );
    }),
    this
  );
}

export class StatefulRequest<T> extends CustomStatefulRequest<T, unknown> {
  constructor(getQuery: StatefulRequest<T>[`getQuery`]) {
    super(getQuery, e => e);
  }
}
