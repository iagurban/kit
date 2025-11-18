import 'ts-jest';

import { makeMatchingTree } from './code-points-matching-tree';
import { allCodePoints, binaryStringSearch, isUppercase } from './string-util';

describe('string utils', () => {
  test('allCodePoints', () => {
    expect(allCodePoints(`abc`)).toEqual([97, 98, 99]);
    expect(allCodePoints([`ab`, `cd`])).toEqual([97, 98, 99, 100]);
  });

  test('isUppercase', () => {
    expect(isUppercase('A')).toBe(true);
    expect(isUppercase('a')).toBe(false);
    expect(isUppercase('Б')).toBe(true);
    expect(isUppercase('б')).toBe(false);
  });

  test('matching tree', () => {
    {
      const matcher = makeMatchingTree([`<`, `>`, `>=`, `==`]);
      expect(matcher.match(`>=<`, 0)).toBe(`>=`);
      expect(matcher.match(`>==`, 0)).toBe(`>=`);
      expect(matcher.match(`>1`, 0)).toBe(`>`);
      expect(matcher.match(`<=1`, 0)).toBe(`<`);
      expect(matcher.match(`=1`, 0)).toBe(undefined);
      expect(matcher.match(`==1`, 0)).toBe(`==`);
    }

    {
      const matcher = makeMatchingTree([`>=`, `==`]);
      expect(matcher.match(`>=<`, 0)).toBe(`>=`);
      expect(matcher.match(`>==`, 0)).toBe(`>=`);
      expect(matcher.match(`>1`, 0)).toBe(undefined);
      expect(matcher.match(`=1`, 0)).toBe(undefined);
      expect(matcher.match(`==1`, 0)).toBe(`==`);
    }

    {
      const matcher = makeMatchingTree([`.`, ``, `-`]);
      expect(matcher.match(``, 0)).toBe(undefined);
      expect(matcher.match(`..`, 0)).toBe(`.`);
    }

    {
      const matcher = makeMatchingTree([`a`]);
      expect(matcher.match(``, 0)).toBe(undefined);
      expect(matcher.match(`..`, 0)).toBe(undefined);
    }
  });

  describe('binaryStringSearch', () => {
    test('finds elements in sorted array', () => {
      const sorted = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      expect(binaryStringSearch(sorted, 'apple')).toBe(0);
      expect(binaryStringSearch(sorted, 'banana')).toBe(1);
      expect(binaryStringSearch(sorted, 'cherry')).toBe(2);
      expect(binaryStringSearch(sorted, 'date')).toBe(3);
      expect(binaryStringSearch(sorted, 'elderberry')).toBe(4);
    });

    test('returns -1 for non-existing elements', () => {
      const sorted = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      expect(binaryStringSearch(sorted, 'fig')).toBe(-1);
      expect(binaryStringSearch(sorted, 'aaa')).toBe(-1);
      expect(binaryStringSearch(sorted, 'zzz')).toBe(-1);
    });

    test('handles empty array', () => {
      expect(binaryStringSearch([], 'anything')).toBe(-1);
    });

    test('handles single-element array', () => {
      const sorted = ['solo'];
      expect(binaryStringSearch(sorted, 'solo')).toBe(0);
      expect(binaryStringSearch(sorted, 'other')).toBe(-1);
    });

    test('works with two-element array', () => {
      const sorted = ['first', 'second'];
      expect(binaryStringSearch(sorted, 'first')).toBe(0);
      expect(binaryStringSearch(sorted, 'second')).toBe(1);
      expect(binaryStringSearch(sorted, 'missing')).toBe(-1);
    });

    test('handles case-sensitive search correctly', () => {
      const sorted = ['Apple', 'apple', 'banana'];
      expect(binaryStringSearch(sorted, 'Apple')).toBe(0);
      expect(binaryStringSearch(sorted, 'apple')).toBe(1);
      expect(binaryStringSearch(sorted, 'APPLE')).toBe(-1);
    });

    test('works with special characters', () => {
      const sorted = ['!apple', '#banana', '$cherry', '%date'];
      expect(binaryStringSearch(sorted, '!apple')).toBe(0);
      expect(binaryStringSearch(sorted, '#banana')).toBe(1);
      expect(binaryStringSearch(sorted, '$cherry')).toBe(2);
      expect(binaryStringSearch(sorted, '%date')).toBe(3);
      expect(binaryStringSearch(sorted, '@missing')).toBe(-1);
    });

    test('requires sorted input array', () => {
      const sorted = ['a', 'b', 'c', 'd', 'e'];
      const unsorted = ['b', 'a', 'e', 'c', 'd'];

      // Should work with sorted array
      expect(binaryStringSearch(sorted, 'c')).toBe(2);

      // May fail or give incorrect results with unsorted array
      const result = binaryStringSearch(unsorted, 'c');
      expect(result).not.toBe(unsorted.indexOf('c')); // Should demonstrate why sorting is required
    });
  });
});
