import { Checker, Checkers } from './util';

/**
 * A utility function used to determine whether a given value is a tuple of a specific structure.
 *
 * This function accepts an array of type checkers and validates if the provided value is a tuple
 * matching the specified type structure. Each element in the tuple is validated against its corresponding type checker.
 *
 * @param {...Checkers<Vs>} items - An array of type-checking functions, one for each element in the tuple.
 * @returns {(o: unknown) => o is Vs} - A function that takes a value `o` and checks if it matches the tuple defined by the specified type checkers.
 */
export const isTuple =
  <Vs extends readonly unknown[]>(...items: Checkers<Vs>): Checker<Vs> =>
  (o): o is Vs => {
    if (!Array.isArray(o) || o.length !== items.length) {
      return false;
    }
    for (const [i, element] of items.entries()) {
      if (!element(o[i])) {
        return false;
      }
    }

    return true;
  };
