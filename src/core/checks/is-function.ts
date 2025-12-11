import { AnyAnyFunction } from '../types';
import { tagChecker } from './util';

/**
 * Checks if the provided value is a function.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a function, otherwise false.
 */
export const isFunction = tagChecker(
  (o: unknown): o is AnyAnyFunction => typeof o === 'function',
  `function`
);
