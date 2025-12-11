import { tagChecker } from './util';

/**
 * Checks specifically for NaN (typeof number AND is NaN).
 * Use this if you actually want to allow NaN: isSomeOf(isNumber, isNaN)
 */
export const isNaN = tagChecker((o: unknown): o is number => Number.isNaN(o), `NaN`);
