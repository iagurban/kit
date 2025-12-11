import { isIterable } from './is-iterable';
import { isIterator } from './is-iterator';
import { tagChecker } from './util';

/**
 * Checker that determines whether a value is an `IterableIterator`.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is both iterable and an iterator, otherwise false.
 */
export const isIterableIterator = tagChecker(
  (value: unknown): value is IterableIterator<unknown> => isIterator(value) && isIterable(value),
  `iterableIterator`
);
