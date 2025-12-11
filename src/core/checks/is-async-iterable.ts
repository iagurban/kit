import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is an async iterable.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value implements `Symbol.asyncIterator`, otherwise false.
 */
export const isAsyncIterable = tagChecker(
  (value: unknown): value is AsyncIterable<unknown> =>
    canHaveProperties(value) && typeof value[Symbol.asyncIterator] === 'function',
  `asyncIterable`
);
