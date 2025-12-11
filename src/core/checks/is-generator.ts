import { isIterableIterator } from './is-iterable-iterator';
import { tagChecker } from './util';

/**
 * Checker that determines whether a value is a generator instance.
 *
 * A generator must be an `IterableIterator` and provide `return` and `throw` methods.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a generator, otherwise false.
 */
export const isGenerator = tagChecker(
  (value: unknown): value is Generator<unknown> =>
    isIterableIterator(value) && typeof value.return === 'function' && typeof value.throw === 'function',
  `generator`
);
