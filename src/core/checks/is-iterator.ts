import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is an iterator (has a callable `next`).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value has a `next` method, otherwise false.
 */
export const isIterator = tagChecker(
  (value: unknown): value is Iterator<unknown> =>
    canHaveProperties(value) && typeof value.next === 'function',
  `iterator`
);
