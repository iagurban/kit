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

type IterableUtils = {
  filter<T, R extends T>(iterable: Iterable<T>, filter: (o: T) => o is R): Iterable<R>;
  filter<T>(iterable: Iterable<T>, filter: (o: T) => unknown): Iterable<T>;
};

export const iterableUtils: IterableUtils = {
  filter<T>(iterable: Iterable<T>, filter: (o: T) => unknown): Iterable<T> {
    return {
      [Symbol.iterator]() {
        const i = iterable[Symbol.iterator]();
        return {
          next() {
            for (;;) {
              const { done, value } = i.next();
              if (done) {
                return { done, value: undefined };
              }
              if (filter(value)) {
                return { value, done: false };
              }
            }
          },
        };
      },
    };
  },
};

export const iu = iterableUtils;
