import { AnyFunction } from '../types';
import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is an async function.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an async function, otherwise false.
 */
export const isAsyncFunction = tagChecker(
  (value: unknown): value is AnyFunction<Promise<unknown>> =>
    canHaveProperties(value) && value[Symbol.toStringTag] === 'AsyncFunction',
  `asyncFunction`
);
