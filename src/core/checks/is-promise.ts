import { isPromiseInstance } from './is-promise-instance';
import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is a Promise or thenable with full Promise API.
 *
 * Fast-path checks native `Promise` instances, then falls back to objects that
 * provide callable `then`, `catch`, and `finally` methods.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value behaves like a Promise, otherwise false.
 */
export const isPromise = tagChecker(
  (value: unknown): value is Promise<unknown> =>
    // Fast Path
    isPromiseInstance(value) ||
    // Slow Path
    (canHaveProperties(value) &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function' &&
      typeof value.finally === 'function'),
  `promise`
);
