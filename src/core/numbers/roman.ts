import { sortedIndex } from 'lodash-es';

const roman = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
] as const;

const nums = roman.map(([, v]) => v).reverse();

const startIndex = (n: number) => Math.max(0, roman.length - sortedIndex(nums, n) - 1);

/**
 * Converts a decimal number to its Roman numeral representation.
 * Uses standard Roman numeral notation including subtractive combinations (e.g., IV for 4, IX for 9).
 *
 * @param num - A positive integer to convert to Roman numerals
 * @returns The Roman numeral representation as a string
 *
 * @example
 * ```typescript
 * convertToRoman(4)    // returns "IV"
 * convertToRoman(9)    // returns "IX"
 * convertToRoman(49)   // returns "XLIX"
 * convertToRoman(999)  // returns "CMXCIX"
 * convertToRoman(2024) // returns "MMXXIV"
 * ```
 *
 * @remarks
 * - The function uses greedy algorithm to construct the Roman numeral
 * - Starts from the largest possible symbol and works down to smaller ones
 * - Optimized to skip unnecessary iterations using startIndex calculation
 */
export const convertToRoman = (num: number): string => {
  let str = '';
  for (let i = startIndex(num); i < roman.length; ++i) {
    const [s, v] = roman[i];
    const q = Math.floor(num / v);
    num -= q * v;
    str += s.repeat(q);
  }

  return str;
};
