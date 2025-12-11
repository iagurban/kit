import { tagChecker } from './util';

/**
 * Checks if a given value is a plain object.
 *
 * A value is considered a plain object if it is not null, has an object type,
 * and its prototype is exactly the default `Object.prototype`.
 *
 * @template T - The type of the input value.
 * @template R - The inferred type of the value's properties.
 * @param {T} o - The value to check.
 * @returns {o is T & Record<string, R>} `true` if the value is a plain object, otherwise `false`.
 */
export const isPlainObject = tagChecker(
  <T, R>(o: T): o is T & Record<string, R> => !!o && Object.getPrototypeOf(o) === Object.prototype,
  `plain-object`
);
