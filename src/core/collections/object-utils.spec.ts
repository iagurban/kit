import { fromEntries, groupedBy, mapEntries, mapOwnEntries, mappedBy } from './object-utils';

describe('Array Utility Functions', () => {
  describe('mappedBy', () => {
    it('should map array elements by a key function', () => {
      const input = [
        { id: 'a', value: 1 },
        { id: 'b', value: 2 },
        { id: 'c', value: 3 },
      ];

      const result = mappedBy(input, item => item.id);

      expect(result).toEqual({
        a: { id: 'a', value: 1 },
        b: { id: 'b', value: 2 },
        c: { id: 'c', value: 3 },
      });
    });

    it('should handle empty array', () => {
      const result = mappedBy([], (item: { id: string }) => item.id);
      expect(result).toEqual({});
    });

    it('should handle numeric keys', () => {
      const input = [
        { num: 1, value: 'one' },
        { num: 2, value: 'two' },
      ];

      const result = mappedBy(input, item => item.num);

      expect(result).toEqual({
        1: { num: 1, value: 'one' },
        2: { num: 2, value: 'two' },
      });
    });
  });

  describe('groupedBy', () => {
    it('should group array elements by a key function', () => {
      const input = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 },
        { category: 'B', value: 4 },
      ];

      const result = groupedBy(input, item => item.category);

      expect(result).toEqual({
        A: [
          { category: 'A', value: 1 },
          { category: 'A', value: 3 },
        ],
        B: [
          { category: 'B', value: 2 },
          { category: 'B', value: 4 },
        ],
      });
    });

    it('should handle empty array', () => {
      const result = groupedBy([], (item: { category: string }) => item.category);
      expect(result).toEqual({});
    });

    it('should handle single item per group', () => {
      const input = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
      ];

      const result = groupedBy(input, item => item.category);

      expect(result).toEqual({
        A: [{ category: 'A', value: 1 }],
        B: [{ category: 'B', value: 2 }],
      });
    });
  });

  describe('mapEntries', () => {
    it('should map object entries using the provided function', () => {
      const input = {
        a: 1,
        b: 2,
        c: 3,
      };

      const result = mapEntries(input, (value: number, key) => value * 2);

      expect(result).toEqual({
        a: 2,
        b: 4,
        c: 6,
      });
    });

    it('should handle empty object', () => {
      const result = mapEntries({}, (value: number, key: string) => value * 2);
      expect(result).toEqual({});
    });

    it('should provide correct key in mapping function', () => {
      const input = { a: 1, b: 2 };
      const mappedKeys: string[] = [];

      mapEntries(input, (value, key) => {
        mappedKeys.push(key);
        return value;
      });

      expect(mappedKeys).toEqual(['a', 'b']);
    });
  });

  describe('fromEntries', () => {
    it('should create object from array of key-value pairs', () => {
      const input = [
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ] as const;

      const result = fromEntries(input);

      expect(result).toEqual({
        a: 1,
        b: 2,
        c: 3,
      });
    });

    it('should handle empty array', () => {
      const result = fromEntries([]);
      expect(result).toEqual({});
    });

    it('should handle numeric keys', () => {
      const input = [
        [1, 'one'],
        [2, 'two'],
      ] as const;

      const result = fromEntries(input);

      expect(result).toEqual({
        1: 'one',
        2: 'two',
      });
    });
  });

  describe('mapOwnEntries', () => {
    it('should map own object entries using the provided function', () => {
      const input = {
        a: 1,
        b: 2,
        c: 3,
      };

      const result = mapOwnEntries(input, (value: number) => value * 2);

      expect(result).toEqual({
        a: 2,
        b: 4,
        c: 6,
      });
    });

    it('should handle empty object', () => {
      const result = mapOwnEntries({}, (value: number) => value * 2);
      expect(result).toEqual({});
    });

    it('should provide correct key in mapping function', () => {
      const input = { a: 1, b: 2 };
      const mappedKeys: string[] = [];

      mapOwnEntries(input, (value, key) => {
        mappedKeys.push(key as string);
        return value;
      });

      expect(mappedKeys).toEqual(['a', 'b']);
    });

    it('should not map inherited properties', () => {
      const parent = {
        inherited: 100,
      };

      const child = Object.create(parent);
      child.own = 1;

      const result = mapOwnEntries(child, (value: number) => value * 2);

      expect(result).toEqual({
        own: 2,
      });
      expect((result as Record<string, unknown>).inherited).toBeUndefined();
    });

    it('should skip non-own properties', () => {
      const proto = { a: 1 };
      const obj = Object.create(proto);
      obj.b = 2;

      const result = mapOwnEntries(obj, (value: number) => value * 2);

      expect(result).toEqual({ b: 4 });
    });
  });
});
