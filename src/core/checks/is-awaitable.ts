import { AnyAnyFunction } from '../types';
import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is awaitable (a thenable).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value has a callable `then`, otherwise false.
 */
export const isAwaitable = tagChecker(
  (value: unknown): value is { then: AnyAnyFunction } =>
    canHaveProperties(value) && typeof value.then === 'function',
  `awaitable`
);
