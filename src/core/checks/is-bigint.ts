import { tagChecker } from './util';

/**
 * Checks if the provided value is a BigInt.
 *
 * @param {unknown} o - The valuMape to be checked.
 * @returns {boolean} Returns true if the input is a bigint, otherwise false.
 */
export const isBigInt = tagChecker((o: unknown): o is bigint => typeof o === 'bigint', `bigint`);
