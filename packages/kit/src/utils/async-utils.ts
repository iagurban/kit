import { Cancelled, CancelPayload } from '../core/cancellable-request';

export const isPromise = <T>(o: unknown): o is Promise<T> => {
  return o != null && (o as { then?: unknown }).then != null;
};

export type PromiseValue<T> = T extends Promise<infer R> ? R : T;

export type CancellablePromise<T> = {
  promise: Promise<T>;
  cancel: (reason: CancelPayload) => void;
};

export const simpleSleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const cancellableSleep = (ms: number): CancellablePromise<void> => {
  let preCancelled: CancelPayload | undefined;
  let cancel: ((cp?: CancelPayload) => void) | undefined;
  return {
    promise: new Promise<void>((resolve, reject) => {
      const settle = (cancelPayload?: CancelPayload) => reject(new Cancelled(cancelPayload));
      if (preCancelled) {
        return settle(preCancelled);
      }
      const tid = setTimeout(resolve, ms);
      cancel = cp => {
        clearTimeout(tid);
        settle(cp);
      };
    }),
    cancel: (cancelPayload?: CancelPayload): void => {
      if (cancel) {
        cancel(cancelPayload);
      } else {
        preCancelled = cancelPayload;
      }
    },
  };
};

export const sleep = Object.assign(simpleSleep, {
  cancellable: cancellableSleep,
});

export type PromisesRecordValue<T> = { [K in keyof T]: PromiseValue<T[K]> };

export const resolveRecord = async <T extends Record<string, unknown>>(
  o: T
): Promise<PromisesRecordValue<T>> => {
  const r: Record<string, unknown> = {};
  const promises: Promise<unknown>[] = [];
  for (const [k, v] of Object.entries(o)) {
    if (isPromise(v)) {
      promises.push(v.then(v => void (r[k] = v)));
    } else {
      r[k] = v;
    }
  }
  if (promises.length) {
    await Promise.all(promises);
  }
  return r as PromisesRecordValue<T>;
};

export const retryingAsync = async <R, C extends { error: Error }>(
  fn: () => R,
  ctx: C,
  onFail: (e: unknown, ctx: C) => boolean | void
) => {
  for (;;) {
    try {
      return await fn();
    } catch (error) {
      const r = onFail(error, ctx);
      if (!r) {
        throw ctx.error;
      }
    }
  }
};
