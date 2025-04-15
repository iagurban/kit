type Checkers<Vs extends readonly unknown[]> = { [K in keyof Vs]: (o: unknown) => o is Vs[K] };

export const compileIsTuples =
  <Vs extends readonly unknown[]>(...isK: Checkers<Vs>) =>
  (o: unknown): o is Vs[] => {
    if (!Array.isArray(o)) {
      return false;
    }
    for (const e of o) {
      if (!Array.isArray(e) || e.length !== isK.length) {
        return false;
      }
      for (const [i, element] of isK.entries()) {
        if (!element(e[i])) {
          return false;
        }
      }
    }
    return true;
  };

export const compileIsArrayOf =
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

export const compileIsAny =
  <Vs extends readonly unknown[]>(...isK: Checkers<Vs>) =>
  (o: unknown): o is Vs[number] => {
    for (const e of isK) {
      if (e(o)) {
        return true;
      }
    }
    return false;
  };

export type Checker<T> = ((o: unknown) => o is T) & { type?: string };

export const isUndefined = Object.assign((o: unknown): o is undefined => o === undefined, {
  type: 'undefined',
});

export const isNullish = Object.assign((o: unknown): o is null | undefined => o == null, {
  type: 'null/undefined',
});

export const isString = Object.assign((o: unknown): o is string => typeof o === 'string', { type: 'string' });

export const isNumber = Object.assign((o: unknown): o is number => typeof o === 'number', { type: 'number' });

export const isInteger = Object.assign((o: unknown): o is number => isNumber(o) && Math.trunc(o) === o, {
  type: 'integer',
});

export const isPlainObject = Object.assign(
  <T, R>(o: T): o is T & Record<string, R> => !!o && Object.getPrototypeOf(o) === Object.prototype,
  { type: 'object/plain' }
);

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
