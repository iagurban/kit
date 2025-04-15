type BasicTypes = 'boolean' | 'string';

type BasicTypeType<S extends BasicTypes> = S extends 'boolean'
  ? boolean
  : S extends 'string'
    ? string
    : never;

export function checked<T, R extends T>(v: T, check: (v: T) => v is R, message: (v: T) => string): R;
export function checked<T>(v: T, check: (v: T) => unknown, message: (v: T) => string): T;

export function checked<T, R extends T>(v: T, check: (v: T) => unknown, message: (v: T) => string): R {
  if (!check(v)) {
    throw new Error(message(v));
  }
  return v as R;
}

export function asserted<T>(v: T, check: (v: T) => unknown, message: (v: T) => string): v is T;
export function asserted<T, R extends T>(v: T, check: (v: T) => v is R, message: (v: T) => string): v is R;

export function asserted<T>(v: T, check: (v: T) => unknown, message: (v: T) => string) {
  if (!check(v)) {
    throw new Error(message(v));
  }
  return v;
}

export const assertion = Object.assign(
  <T>(v: T, message: (v: T) => string) => {
    if (!v) {
      throw new Error(message(v));
    }
  },

  {
    checked,
    // validNumber<V extends number | null | undefined>(
    //   o: V | readonly V[],
    //   message = 'arg is not valid number'
    // ): typeof o {
    //   if (Array.isArray(o)) {
    //     for (const v of o) {
    //       assertion.validNumber(v);
    //     }
    //   } else if (o == null || o !== o) {
    //     throw new Error(message);
    //   }
    //   return o;
    // },

    instanceof<T, C>(o: T, classes: { new (...args: any[]): C }[], message = 'arg is null'): T {
      for (const c of classes) {
        if (o instanceof c) {
          return o;
        }
      }
      throw new Error(message);
    },

    typeof<S extends BasicTypes>(v: unknown, type: S, message?: (t: S) => string): BasicTypeType<S> {
      if (typeof v !== type) {
        throw new TypeError(message ? message(type) : `value is not typeof ${type}`);
      }
      return v as BasicTypeType<S>;
    },
  }
);

export function isDefined<T>(o: T | undefined | null): o is T {
  return o != null;
}

export function isNotUndefined<T>(o: T | undefined): o is T {
  return o !== undefined;
}

export function isNotNull<T>(o: T | null): o is T {
  return o !== null;
}

export function isTruthy<T>(o: T | undefined | null | false | 0 | ''): o is T {
  return !!o;
}
