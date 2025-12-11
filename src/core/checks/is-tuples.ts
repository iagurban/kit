import { isArrayOf } from './is-array-of';
import { isTuple } from './is-tuple';
import { Checker, Checkers } from './util';

/**
 * Determines if a given array adheres strictly to a tuple structure based on provided type checkers.
 *
 * The function checks if the input array matches the expected type structure as defined
 * by an array of type checkers. Each element of the array must conform to the corresponding
 * type checker in the same position.
 *
 * @param {...Checkers<Vs>} items - A list of type checkers corresponding to each element of the expected tuple.
 * @returns {boolean} Returns `true` if the array matches the tuple structure, otherwise `false`.
 */
export const isTuples = <Vs extends readonly unknown[]>(...items: Checkers<Vs>): Checker<Vs[]> =>
  isArrayOf({ item: isTuple<Vs>(...items) });
