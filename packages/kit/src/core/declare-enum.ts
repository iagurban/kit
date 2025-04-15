type Generated<T extends readonly string[], K extends string> = {
  [k in `is${K}`]: (s: string) => s is T[number];
} & {
  [k in `default${K}`]: () => T[number];
} & {
  [k in `get${K}`]: (s: string) => T[number];
} & {
  [k in `all${K}s`]: T;
};

export const declareEnum =
  <K extends string>(prefix: K) =>
  <T extends readonly string[]>(arr: T): Generated<T, K> => {
    const set = new Set<string>(arr);

    const is = (s: string): s is T[number] => set.has(s);
    const d: T[number] = arr[0];

    return {
      [`all${prefix}s`]: arr,
      [`is${prefix}`]: is,
      [`default${prefix}`]: () => d,
      [`get${prefix}`]: (s: string) => {
        if (!is(s)) {
          console.warn(`unsupported ${prefix} ${s}`);
          return d;
        }
        return s;
      },
    } as Generated<T, K>;
  };
