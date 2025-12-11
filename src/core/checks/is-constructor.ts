import { ClassConstructor } from '../types';
import { isGeneratorFunction } from './is-generator-function';
import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is a class/constructor function
 * (i.e., has a prototype and is not a generator function).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value can be used with `new`, otherwise false.
 */
export const isConstructor = tagChecker(
  (value: unknown): value is ClassConstructor<unknown> =>
    canHaveProperties(value) && !!value.prototype && !isGeneratorFunction(value),
  `constructor`
);
