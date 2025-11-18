export const buckets = <T>(a: readonly T[], size: number) => {
  const r: T[][] = [];
  let offset = 0;
  for (;;) {
    const end = offset + size;
    const n = a.slice(offset, end);
    if (n.length < 1) {
      return r;
    }
    r.push(n);
    offset = end;
  }
};

export const samples = (length: number, by?: (idx: number) => number): number[] =>
  Array.from({ length }, by ? (_, i) => by(i) : (_, i) => i);

export const samplesBy = <T>(length: number, by: (index: number) => T): T[] =>
  Array.from({ length }, (_, i) => by(i));

export const pickRandomItems = <T>(count: number, from: readonly T[]): T[] => {
  if (count < 0 || count !== Math.trunc(count) || count > from.length) {
    throw new Error('programming error');
  }

  const a = [...from];
  return samplesBy(count, () => a.splice(Math.trunc(Math.random() * a.length), 1)[0]);
};

export const ArrayMutators = {
  insert<T>(a: T[], value: T, pos: number, mutate = false) {
    const copy = mutate ? a : [...a];
    copy.splice(pos, 0, value);
    return copy;
  },
  move<T>(a: T[], from: number, to: number, mutate = false) {
    const copy = mutate ? a : [...a];
    copy.splice(to, 0, ...copy.splice(from, 1));
    return copy;
  },
  remove<T>(a: T[], from: number, count = 1, mutate = false) {
    const copy = mutate ? a : [...a];
    copy.splice(from, count);
    return copy;
  },
  set<T>(a: T[], value: T, pos: number, mutate = false) {
    const copy = mutate ? a : [...a];
    copy[pos] = value;
    return copy;
  },
};

export const mapArrayIfNotEmpty = <T, U>(
  array: T[],
  mapper: (t: T, i: number, arr: readonly T[]) => U,
  empty: () => U
): U[] => (array.length === 0 ? [empty()] : array.map(mapper));
