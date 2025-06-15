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

export const camelToText = (input: string, capitalizeFirst = true): string => {
  const result = input
    // Add space between lower/number and upper (e.g. userID → user ID)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // Add space between acronym and next word (e.g. HTMLParser → HTML Parser)
    .replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1 $2')
    // Add space between letters and numbers (e.g. item42 → item 42, or A1 → A 1)
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    .toLowerCase();

  return capitalizeFirst ? result.charAt(0).toUpperCase() + result.slice(1) : result;
};
