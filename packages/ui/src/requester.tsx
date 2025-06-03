import { uidGenerator } from '@freyja/kit';
import {
  action,
  computed,
  makeObservable,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
  reaction,
  runInAction,
} from 'mobx';

class Disposer {
  private disposers: (() => void)[] = [];

  readonly fire = () => {
    for (const d of this.disposers) {
      d();
    }
    this.disposers = [];
  };

  add(...d: readonly (() => void)[]) {
    this.disposers.push(...d);
  }

  destructable<T extends { destroy(): void }>(o: T) {
    this.add(() => o.destroy());
    return o;
  }
}

export type PromiseWithCancel<T> = { promise: Promise<T>; cancel?: () => void };
export type PromiseMaybeWithCancel<T> = Promise<T> | PromiseWithCancel<T>;
export const isNotWithCancel = <T,>(o: Promise<T> | PromiseWithCancel<T>): o is Promise<T> =>
  !!((o as Promise<T>).then && (o as Promise<T>).catch);
export const getPromiseWithCancel = <T,>(p: PromiseMaybeWithCancel<T>) =>
  isNotWithCancel(p) ? { promise: p } : p;

class RequestState<T> {
  constructor(
    readonly request: () => PromiseMaybeWithCancel<T>,
    enabled: boolean
  ) {
    this.enabled = enabled;
    makeObservable(this);
  }

  readonly disposer = new Disposer();

  @observable enabled: boolean;

  @action
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  @observable.ref
  loading: { promise: Promise<T>; cancel?: () => void; key: unknown } | null = null;
  @observable
  result: T | undefined = undefined;
  @observable
  error: unknown | undefined = undefined;

  // !result + !loading = not requested
  // !result + loading = loading
  // result + !loading = loaded
  // result + loading = error

  @observable
  private initialized = false;

  @action
  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.disposer.add(
      reaction(
        () => [this.enabled, this.loading, this.initialized, this.result],
        () => this.tryStartRequest(),
        { fireImmediately: true }
      )
    );
  }

  @action
  destroy() {
    this.initialized = false;
    this.cancel();
    this.disposer.fire();
  }

  @action
  private setResult(result: typeof this.result, error: typeof this.error) {
    this.result = result;
    this.error = error;
  }

  @action
  private setLoading(loading: typeof this.loading) {
    this.loading = loading;
  }

  @action
  private tryStartRequest() {
    if (this.result !== undefined || this.loading || !this.enabled || !this.initialized) {
      return;
    }

    const key = Object.create(null);
    const { promise, cancel } = getPromiseWithCancel(this.request());
    this.loading = {
      promise: promise
        .catch(e => {
          if (this.loading?.key === key) {
            this.setResult(undefined, e);
          }
          throw e;
        })
        .then(r => {
          if (this.loading?.key === key) {
            this.setResult(r, undefined);
          }
          return r;
        })
        .finally(() => {
          if (this.loading?.key === key) {
            this.setLoading(null);
          }
        }),
      key,
      cancel: () => {
        cancel?.();
        if (this.loading?.key === key) {
          this.setLoading(null);
        }
      },
    };
  }

  @action
  cancel() {
    if (this.loading) {
      this.loading.cancel?.();
      this.loading = null;
    }
    this.setResult(undefined, new Error(`Cancelled`));
  }

  @action
  invalidate() {
    this.setResult(undefined, undefined);
  }
}

export class Requester<T> {
  constructor() {
    makeObservable(this);
    // console.log(`constructor`, this.uid);
    // this.observeObserved();
  }

  readonly uid = uidGenerator();

  observeObserved() {
    if (this.observationDisposer) {
      return;
    }

    const onObserved = () => {
      runInAction(() => {
        this.observedCount++;
        if (this.observedCount > 0) {
          this.requestState?.setEnabled(true);
        }
      });
    };

    const onUnobserved = () => {
      runInAction(() => {
        this.observedCount--;
        // if (this.observedCount < 0) {
        //   throw new ProgrammingError(`this.observedCount = ${this.observedCount}`);
        // }
        if (this.observedCount < 1) {
          this.requestState?.setEnabled(false);
        }
      });
    };
    // console.log(`start observing`, this.uid);
    this.observedCount = 0;
    const d = [
      onBecomeObserved(this, 'requestState', onObserved),
      onBecomeUnobserved(this, 'requestState', onUnobserved),
    ];

    this.observationDisposer = () => {
      d.forEach(f => f());

      // console.log(`end observing`, this.uid);
    };
  }

  private observationDisposer?: () => void;

  @observable.ref
  private requestState: RequestState<T> | null = null;

  private initialized = false;
  @action
  init() {
    // console.log(`init`, this.uid);
    if (this.initialized) {
      throw new Error(`double init`);
    }
    this.initialized = true;

    this.requestState?.init();
    this.observeObserved();
  }

  @action.bound
  destroy() {
    // console.log(`destroy`, this.uid);
    if (this.observationDisposer) {
      this.observationDisposer();
      this.observationDisposer = undefined;
    }
    this.requestState?.destroy();
    this.initialized = false;
  }

  @observable
  private observedCount: number = 0;

  @action setRequest(request: () => Promise<T> | PromiseWithCancel<T>) {
    this.requestState?.destroy();
    this.requestState = new RequestState(request, !!this.observedCount);
    this.requestState.init();
  }

  @computed
  get loading() {
    return !!this.requestState?.loading;
  }

  get result() {
    return this.requestState?.result;
  }
}
