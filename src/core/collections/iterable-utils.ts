/**
 * Creates an iterator that yields the elements of an array in reverse order.
 * @param array The array to iterate over.
 * @returns An iterator that yields the elements of the array in reverse order.
 */
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

/**
 * Creates an iterator that yields the elements of an array along with their indices.
 * @param array The array to iterate over.
 * @returns An iterator that yields pairs of [element, index].
 */
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

/**
 * Creates an iterator that yields the elements of an array-like object in reverse order.
 * @param a The array-like object to iterate over.
 * @returns An iterator that yields the elements of the array-like object in reverse order.
 */
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
  /**
   * Filters an iterable, returning a new iterable with only the elements that pass the test implemented by the provided function.
   * @param iterable The iterable to filter.
   * @param filter The function to test each element of the iterable. Return a value that coerces to true to keep the element, or to false otherwise.
   * @returns A new iterable with the elements that pass the test.
   */
  filter<T, R extends T>(iterable: Iterable<T>, filter: (o: T) => o is R): Iterable<R>;
  /**
   * Filters an iterable, returning a new iterable with only the elements that pass the test implemented by the provided function.
   * @param iterable The iterable to filter.
   * @param filter The function to test each element of the iterable. Return a value that coerces to true to keep the element, or to false otherwise.
   * @returns A new iterable with the elements that pass the test.
   */
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
