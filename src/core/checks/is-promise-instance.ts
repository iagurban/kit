import { tagChecker } from './util';

/**
 * Checker that determines whether a value is a native `Promise` instance.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an instance of `Promise`, otherwise false.
 */
export const isPromiseInstance = tagChecker(
  (value: unknown): value is Promise<unknown> => value instanceof Promise,
  `Promise`
);
