import { tagChecker } from './util';

/**
 * A type guard function to check if the given input is of type boolean.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a boolean, otherwise false.
 */
export const isBoolean = tagChecker((o: unknown): o is boolean => typeof o === `boolean`, `boolean`);
