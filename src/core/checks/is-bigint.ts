import { tagChecker } from './util';

/**
 * Checker that determines whether a value is a BigInt.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a bigint, otherwise false.
 */
export const isBigInt = tagChecker((value: unknown): value is bigint => typeof value === 'bigint', `bigint`);
