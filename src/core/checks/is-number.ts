import { tagChecker } from './util';

/**
 * Checker that determines whether a value is a valid number
 * (typeof `number` and not `NaN`).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a number and not `NaN`, otherwise false.
 */
export const isNumber = tagChecker(
  (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value),
  `number`
);
