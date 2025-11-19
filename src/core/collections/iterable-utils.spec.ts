import { indexed, iterableUtils, iu, reverse, reversed } from './iterable-utils';

describe('iterable-utils', () => {
  describe('reversed', () => {
    it('should iterate array in reverse order', () => {
      const arr = [1, 2, 3, 4];
      const result = [...reversed(arr)];
      expect(result).toEqual([4, 3, 2, 1]);
    });

    it('should handle empty array', () => {
      const result = [...reversed([])];
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const result = [...reversed([1])];
      expect(result).toEqual([1]);
    });

    it('should not modify original array', () => {
      const original = [1, 2, 3];
      void [...reversed(original)];
      expect(original).toEqual([1, 2, 3]);
    });
  });

  describe('indexed', () => {
    it('should return pairs of values and indices in reverse order', () => {
      const arr = ['a', 'b', 'c'];
      const result = [...indexed(arr)];
      expect(result).toEqual([
        ['c', 2],
        ['b', 1],
        ['a', 0],
      ]);
    });

    it('should handle empty array', () => {
      const result = [...indexed([])];
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const result = [...indexed(['a'])];
      expect(result).toEqual([['a', 0]]);
    });
  });

  describe('reverse', () => {
    it('should iterate array-like object in reverse order', () => {
      const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
      const result = [...reverse(arrayLike)];
      expect(result).toEqual(['c', 'b', 'a']);
    });

    it('should handle empty array-like object', () => {
      const arrayLike = { length: 0 };
      const result = [...reverse(arrayLike)];
      expect(result).toEqual([]);
    });

    it('should handle array-like object with single element', () => {
      const arrayLike = { 0: 'a', length: 1 };
      const result = [...reverse(arrayLike)];
      expect(result).toEqual(['a']);
    });
  });

  describe('iterableUtils.filter', () => {
    it('should filter elements based on predicate', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const isEven = (n: number) => n % 2 === 0;
      const result = [...iterableUtils.filter(numbers, isEven)];
      expect(result).toEqual([2, 4, 6]);
    });

    it('should handle empty iterable', () => {
      const result = [...iterableUtils.filter([], () => true)];
      expect(result).toEqual([]);
    });

    it('should handle type predicates', () => {
      const items = [1, 'a', 2, 'b', 3];
      const isNumber = (x: number | string): x is number => typeof x === 'number';
      const result = [...iterableUtils.filter(items, isNumber)];
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle all elements filtered out', () => {
      const numbers = [1, 2, 3];
      const result = [...iterableUtils.filter(numbers, () => false)];
      expect(result).toEqual([]);
    });
  });

  describe('iu alias', () => {
    it('should provide same functionality as iterableUtils', () => {
      const numbers = [1, 2, 3, 4];
      const isEven = (n: number) => n % 2 === 0;

      const filteredWithIu = [...iu.filter(numbers, isEven)];
      const filteredWithUtils = [...iterableUtils.filter(numbers, isEven)];

      expect(filteredWithIu).toEqual(filteredWithUtils);
    });
  });

  // Iterator protocol tests
  describe('Iterator protocol compliance', () => {
    it('reversed should implement iterator protocol correctly', () => {
      const iterator = reversed([1, 2, 3]);
      expect(typeof iterator[Symbol.iterator]).toBe('function');
      expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('indexed should implement iterator protocol correctly', () => {
      const iterator = indexed([1, 2, 3]);
      expect(typeof iterator[Symbol.iterator]).toBe('function');
      expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('reverse should implement iterator protocol correctly', () => {
      const iterator = reverse([1, 2, 3]);
      expect(typeof iterator[Symbol.iterator]).toBe('function');
      expect(iterator[Symbol.iterator]()).toBe(iterator);
    });
  });
});
