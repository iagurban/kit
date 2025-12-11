import { tagChecker } from './util';

/**
 * Checker that determines whether a value is a string.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a string, otherwise false.
 */
export const isString = tagChecker((value: unknown): value is string => typeof value === 'string', `string`);
