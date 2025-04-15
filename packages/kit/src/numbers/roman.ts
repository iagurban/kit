import { sortedIndex } from 'lodash';

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
