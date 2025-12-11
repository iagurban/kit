import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is iterable.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value implements `Symbol.iterator`, otherwise false.
 */
export const isIterable = tagChecker(
  (value: unknown): value is Iterable<unknown> =>
    canHaveProperties(value) && typeof value[Symbol.iterator] === 'function',
  `iterable`
);
