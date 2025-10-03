export type Checker<T> = ((o: unknown) => o is T) & { type?: string };

export const isDefined = <T>(o: T | undefined | null): o is T => o != null;

export const isNotUndefined = <T>(o: T | undefined): o is T => o !== undefined;

export const isNotNull = <T>(o: T | null): o is T => o !== null;

export const isTruthy = <T>(o: T | undefined | null | false | 0 | ''): o is T => !!o;

export const isUndefined = (o: unknown): o is undefined => o === undefined;

export const isNull = (o: unknown): o is null => o === null;

export const isNullish = (o: unknown): o is null | undefined => o == null;

export const isString = (o: unknown): o is string => typeof o === 'string';

export const isNumber = (o: unknown): o is number => typeof o === 'number';

export const isInteger = (o: unknown): o is number => isNumber(o) && Math.trunc(o) === o;

export const isPlainObject = <T, R>(o: T): o is T & Record<string, R> =>
  !!o && Object.getPrototypeOf(o) === Object.prototype;

export const isSomeObject = <T, R>(o: T): o is T & Record<string, R> =>
  typeof o === 'object' && o != null && !Array.isArray(o);

export const isROArray = <A>(a: unknown | A[] | readonly A[]): a is readonly A[] => Array.isArray(a);

export const isArray =
  <K>(isK: (o: unknown) => o is K) =>
  (o: unknown): o is K[] => {
    if (!Array.isArray(o)) {
      return false;
    }
    for (const e of o) {
      if (!isK(e)) {
        return false;
      }
    }
    return true;
  };

export const isInstanceOf =
  <C>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...classes: { new (...args: any[]): C }[]
  ) =>
  (o: unknown): o is C => {
    for (const c of classes) {
      if (o instanceof c) {
        return true;
      }
    }
    return false;
  };

type Checkers<Vs extends readonly unknown[]> = { [K in keyof Vs]: (o: unknown) => o is Vs[K] };

export const isSomeOf =
  <Vs extends readonly unknown[]>(...isK: Checkers<Vs>) =>
  (o: unknown): o is Vs[number] => {
    for (const e of isK) {
      if (e(o)) {
        return true;
      }
    }
    return false;
  };

export const isTuple =
  <Vs extends readonly unknown[]>(...isK: Checkers<Vs>) =>
  (o: unknown): o is Vs => {
    if (!Array.isArray(o) || o.length !== isK.length) {
      return false;
    }
    for (const [i, element] of isK.entries()) {
      if (!element(o[i])) {
        return false;
      }
    }

    return true;
  };

export const isTuples = <Vs extends readonly unknown[]>(...isK: Checkers<Vs>) => isArray(isTuple<Vs>(...isK));

export const validator =
  <K>(isK: Checker<K>) =>
  <R>(o: unknown, fn: (o: K) => R) => {
    if (!isK(o)) {
      throw new Error(`check ${isK.type == null ? '' : `of type ${isK.type} `}failed, got ${o}`);
    }
    return fn(o);
  };

export const validator0 =
  <K>(isK: Checker<K>) =>
  (o: unknown) => {
    if (!isK(o)) {
      throw new Error(`check ${isK.type == null ? '' : `of type ${isK.type} `}failed, got ${o}`);
    }
    return o;
  };

export function checked<T, R extends T>(v: T, check: (v: T) => v is R, message: (v: T) => string): R;
export function checked<T>(v: T, check: (v: T) => unknown, message: (v: T) => string): T;
export function checked<T, R extends T>(v: T, check: (v: T) => unknown, message: (v: T) => string): R {
  if (!check(v)) {
    throw new Error(message(v));
  }
  return v as R;
}
