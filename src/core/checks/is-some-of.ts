import { Checker, Checkers, checkerType, tagCheckerGetter } from './util';

/**
 * A utility function that checks whether a given value satisfies at least one of the provided type-checking functions.
 *
 * @param {...Checkers<Vs>} checkers - A rest parameter consisting of an array of type-checking functions.
 * Each function should take a value of an unknown type and validate if it matches a specific type or condition.
 * @returns {(o: unknown) => boolean} A function that takes an unknown value and returns `true` if the value satisfies
 * at least one of the provided type-checking functions, or `false` otherwise.
 */
export const isSomeOf = <Vs extends readonly unknown[]>(...checkers: Checkers<Vs>): Checker<Vs[number]> =>
  tagCheckerGetter(
    (o): o is Vs[number] => {
      for (const e of checkers) {
        if (e(o)) {
          return true;
        }
      }
      return false;
    },
    () => `(${checkers.map(c => checkerType(c)).join(` | `)})`
  );
