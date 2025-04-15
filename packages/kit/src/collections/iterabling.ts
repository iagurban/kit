import { reversed } from '../utils/array-utils';

type Iterabling = {
  filter<T, R extends T>(iterable: Iterable<T>, filter: (o: T) => o is R): Iterable<R>;
  filter<T>(iterable: Iterable<T>, filter: (o: T) => unknown): Iterable<T>;
  reversed<T>(iterable: Iterable<T>): Iterable<T>;
};

export const iterabling: Iterabling = {
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
  reversed,
};
