import { isPromise } from './async-utils';
import { AnyAnyFunction } from './types';

export const skipCalls = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  n: number
): ((...args: Args) => void) => {
  if (!(n >= 0)) {
    throw new Error(`n = ${n} (>=0 allowed only)`);
  }
  if (Math.floor(n) !== n) {
    throw new Error(`n = ${n} (integer allowed only)`);
  }
  let count = 0;
  return (...args: Args) => (count < n ? void ++count : fn(...args));
};

export const mergeFunctions = <T extends unknown[]>(...fns: ((...args: T) => unknown)[]) => {
  return (...args: T) => {
    for (const fn of fns) {
      fn(...args);
    }
  };
};

export const addReturn =
  <Fn extends (...args: unknown[]) => void, R>(fn: Fn, ret: R) =>
  (...args: Parameters<Fn>) => {
    fn(...args);
    return ret;
  };

type BusyGuardResult<T extends AnyAnyFunction> =
  ReturnType<T> extends Promise<unknown> ? Promise<ReturnType<T>> : ReturnType<T>;
export const denyRecursion = <T extends AnyAnyFunction>(
  action: T,
  err: string | ((...args: Parameters<T>) => Error | string)
) => {
  let busy = false;

  return (...args: Parameters<T>): BusyGuardResult<T> => {
    if (busy) {
      if (typeof err === `string`) {
        throw new Error(err);
      }
      const e = err(...args);
      throw typeof e === `string` ? new Error(e) : e;
    }

    busy = true;
    let r: BusyGuardResult<T>;
    try {
      r = action(...args);
    } catch (error) {
      busy = false;
      throw error;
    }

    if (isPromise(r)) {
      return r.finally(() => void (busy = false));
    }

    busy = false;
    return r;
  };
};

const busySymbol: unique symbol = Symbol(`multiRecurringDenier.busy`);

export const multiRecurringDenier = <Fn extends AnyAnyFunction, K>(
  fn: Fn,
  key: (...args: Parameters<Fn>) => K,
  error: (...args: Parameters<Fn>) => string | Error
): ((...args: Parameters<Fn>) => ReturnType<Fn>) => {
  const mapping = new Map<K, typeof busySymbol | ReturnType<Fn>>();

  return (...args) => {
    const k = key(...args);

    const ready = mapping.get(k);
    if (ready === busySymbol) {
      const e = error(...args);
      throw typeof e === `string` ? new Error(e) : e;
    }
    if (ready) {
      return ready;
    }
    mapping.set(k, busySymbol);

    try {
      const ret = fn(...args);
      mapping.set(k, ret);
      return ret;
    } catch (error) {
      mapping.delete(k);
      throw error;
    }
  };
};
