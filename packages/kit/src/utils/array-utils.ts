import { ExMap } from '../collections/ex-map';
import { Nullish } from './types';

export const reversed = <T>(array: T[]) => {
  let index = array.length;
  return {
    next: () => ({
      done: index === 0,
      value: array[--index],
    }),
    [Symbol.iterator]() {
      return this;
    },
  };
};

export const indexed = <T>(array: T[]) => {
  let index = array.length;
  const val = (i: number) => [array[i], i] as const;

  return {
    next: () => ({
      done: index === 0,
      value: val(--index),
    }),
    [Symbol.iterator]() {
      return this;
    },
  };
};

export const reverse = <T>(a: ArrayLike<T>) => {
  let index = a.length;
  return {
    next() {
      index--;
      return {
        done: index < 0,
        value: a[index],
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

export const isROArray = <A>(a: unknown | readonly A[]): a is readonly A[] => Array.isArray(a);

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

export const flatten = <T>(a: T[][]): T[] => a.flat();

export const flatten2x = <T>(a: T[][][]): T[] => flatten(flatten(a));

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

export const fromEntries = <T extends string | number | symbol, V>(
  pairs: readonly (readonly [T, V])[]
): Record<T, V> => Object.fromEntries(pairs) as Record<T, V>;

export const syncArray = <Derived, Input, ID>(
  input: readonly Input[],
  getInputId: (v: Input) => ID,
  /* mutated */ array: Derived[],
  create: (v: Input) => Derived,
  update: (data: Derived, v: Input) => void,
  deleted: ((v: Derived) => void) | Nullish,
  getID: (v: Derived) => ID
) => {
  const oldById = ExMap.mappedBy(
    array.map((v, i) => ({ v, i })),
    ({ v }) => getID(v)
  );

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line unicorn/no-lonely-if
    if (oldById.size !== array.length) {
      throw new Error(`array length mismatch, not unique ids at input`);
    }
  }

  const insert = (v: Derived, id: ID, idx: number) => {
    array.splice(idx, 0, v);
    oldById.delete(id);
    oldById.forEach(v => v.i >= idx && ++v.i);
  };

  const remove = (idx: number) => {
    const [old] = array.splice(idx, 1);
    oldById.forEach(v => v.i >= idx && --v.i);
    return old;
  };

  for (const [idx, src] of input.entries()) {
    const id = getInputId(src);
    const old = oldById.get(id);
    if (old) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line unicorn/no-lonely-if
        if (id !== getID(old.v)) {
          throw new Error(`mismatch (possible something wrong with indexes in algo)`);
        }
      }
      if (old.i !== idx) {
        insert(remove(old.i), id, idx);
      }
      update(old.v, src);
    } else {
      insert(create(src), id, idx);
    }
  }

  if (deleted) {
    for (const { v } of oldById.values()) {
      deleted(v);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const m = ExMap.mappedBy(array, getID);
    if (m.size !== array.length) {
      throw new Error(`array length mismatch, not unique ids`);
    }
    for (const [idx, o] of array.entries()) {
      if (getID(o) !== getInputId(input[idx])) {
        throw new Error(`wrong order at final`);
      }
    }
  }
};
