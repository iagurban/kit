export const oFromEntries = <K extends string | number | symbol, V>(
  entries: readonly [K, V][]
): Record<K, V> => Object.fromEntries(entries) as Record<K, V>;

export const oEntries = <K extends string | number | symbol, V>(obj: Readonly<Record<K, V>>): [K, V][] =>
  Object.entries(obj) as [K, V][];

export type TupleOf<T, L extends number, A extends T[] = []> = A['length'] extends L
  ? A
  : TupleOf<T, L, [...A, T]>;

export const assertLength = <T, L extends number>(a: T[], l: L): TupleOf<T, L> => {
  if (a.length !== l) {
    throw new Error(`expected length ${l}, got ${a.length}`);
  }
  return a as TupleOf<T, L>;
};

export const mantineCssVar = (name: string, index: number) => `var(--mantine-color-${name}-${index})`;
