import { isNumber } from './is-number';
import { tagChecker } from './util';

/**
 * Determines whether the provided value is an integer.
 *
 * This function checks if the input is a number and verifies
 * that it has no fractional component by comparing the value
 * to its truncated version.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the value is a number and an integer, false otherwise.
 */
export const isInteger = tagChecker(
  (o: unknown): o is number => isNumber(o) && Math.trunc(o) === o,
  `integer`
);
