import { tagChecker } from './util';

/**
 * Checks if the provided value is an object and not null, while also ensuring
 * it is not an array. This function performs a type guard that verifies the
 * value is an object with string keys and values of a specific type.
 *
 * @template T - The original type of the input value.
 * @template R - The type of the object property values.
 * @param {T} o - The value to check.
 * @returns {o is T & Record<string, R>} - Returns true if the value is an object
 * and meets the specified constraints, otherwise false.
 */
export const isSomeObject = tagChecker(
  <T, R>(o: T): o is T & Record<string, R> => typeof o === 'object' && o != null && !Array.isArray(o),
  `some-object`
);
