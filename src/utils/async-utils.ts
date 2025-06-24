export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const isPromise = <T>(o: unknown): o is Promise<T> => {
  return o != null && (o as { then?: unknown }).then != null;
};

export type PromiseValue<T> = T extends Promise<infer R> ? R : T;

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
