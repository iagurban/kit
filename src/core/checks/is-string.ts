import { tagChecker } from './util';

/**
 * A type guard function to check if the given input is of type string.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a string, otherwise false.
 */
export const isString = tagChecker((o: unknown): o is string => typeof o === 'string', `string`);
