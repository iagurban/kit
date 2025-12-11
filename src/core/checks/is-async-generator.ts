import { isAsyncIterable } from './is-async-iterable';
import { tagChecker } from './util';

/**
 * Checker that determines whether a value is an async generator instance.
 *
 * An async generator must be async-iterable and implement `next`, `return`, and `throw` methods.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an async generator, otherwise false.
 */
export const isAsyncGenerator = tagChecker(
  (value: unknown): value is AsyncGenerator<unknown> =>
    isAsyncIterable(value) &&
    typeof (value as unknown as { next: unknown }).next === 'function' && // Async generators must still have .next()
    typeof (value as unknown as { return: unknown }).return === 'function' &&
    typeof (value as unknown as { throw: unknown }).throw === 'function',
  `asyncGenerator`
);
