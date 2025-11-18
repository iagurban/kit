import { ExSet } from './ex-set';

describe('ExSet', () => {
  describe('standard Set interface', () => {
    let set: ExSet<number>;

    beforeEach(() => {
      set = new ExSet([1, 2, 3]);
    });

    test('constructor with initial values', () => {
      expect(set.size).toBe(3);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(true);
      expect(set.has(3)).toBe(true);
    });

    test('add and has', () => {
      set.add(4);
      expect(set.has(4)).toBe(true);
      expect(set.size).toBe(4);
    });

    test('delete', () => {
      expect(set.delete(1)).toBe(true);
      expect(set.has(1)).toBe(false);
      expect(set.delete(99)).toBe(false);
    });

    test('clear', () => {
      set.clear();
      expect(set.size).toBe(0);
      expect(set.has(1)).toBe(false);
    });

    test('forEach', () => {
      const results: Array<[number, number, ExSet<number>]> = [];
      set.forEach((value1, value2, self) => {
        results.push([value1, value2, self]);
      });
      expect(results).toEqual([
        [1, 1, set],
        [2, 2, set],
        [3, 3, set],
      ]);
    });

    test('iterators', () => {
      expect([...set.entries()]).toEqual([
        [1, 1],
        [2, 2],
        [3, 3],
      ]);
      expect([...set.keys()]).toEqual([1, 2, 3]);
      expect([...set.values()]).toEqual([1, 2, 3]);
      expect([...set]).toEqual([1, 2, 3]);
    });

    test('Symbol.toStringTag', () => {
      expect(Object.prototype.toString.call(set)).toBe('[object ExSet]');
    });
  });

  describe('set operations', () => {
    let set1: ExSet<number>;
    let set2: ExSet<number>;

    beforeEach(() => {
      set1 = new ExSet([1, 2, 3, 4]);
      set2 = new ExSet([3, 4, 5, 6]);
    });

    test('intersects', () => {
      expect(set1.intersects(set2)).toBe(true);
      expect(set1.intersects([5, 6, 7])).toBe(false);
    });

    test('join', () => {
      set1.join(set2);
      expect([...set1]).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('subtract', () => {
      set1.subtract(set2);
      expect([...set1]).toEqual([1, 2]);
    });

    test('or (union)', () => {
      const result = set1.or(set2);
      expect([...result]).toEqual([1, 2, 3, 4, 5, 6]);
      expect(set1).not.toBe(result); // Should create a new instance
    });

    test('diff (difference)', () => {
      const result = set1.diff(set2);
      expect([...result]).toEqual([1, 2]);
      expect(set1).not.toBe(result); // Should create a new instance
    });

    test('and (intersection)', () => {
      const result = set1.and(set2);
      expect([...result]).toEqual([3, 4]);
    });

    test('and with different iterable types', () => {
      expect([...set1.and([3, 4, 5])]).toEqual([3, 4]);
      expect([...set1.and(new Set([3, 4, 5]))]).toEqual([3, 4]);
    });

    test('xor (symmetric difference)', () => {
      const result = set1.xor(set2);
      expect([...result]).toEqual([1, 2, 5, 6]);
    });
  });

  describe('extended functionality', () => {
    let set: ExSet<number>;

    beforeEach(() => {
      set = new ExSet([1, 2, 3]);
    });

    test('toArray with transformation', () => {
      const result = set.toArray(x => x * 2);
      expect(result).toEqual([2, 4, 6]);
    });

    test('readonly getter', () => {
      const readonlySet = set.readonly;
      expect([...readonlySet]).toEqual([1, 2, 3]);
    });

    test('freeze', () => {
      const frozen = set.freeze();
      expect(() => (frozen as typeof frozen & { add(n: number): void }).add(4)).toThrow(
        'Can not mutate frozen ExSet'
      );
      expect(() => (frozen as typeof frozen & { delete(n: number): void }).delete(1)).toThrow(
        'Can not mutate frozen ExSet'
      );
      expect(() => (frozen as typeof frozen & { clear(): void }).clear()).toThrow(
        'Can not mutate frozen ExSet'
      );
      expect([...frozen]).toEqual([1, 2, 3]);
    });

    describe('backup and restore', () => {
      test('basic backup and restore', () => {
        const restore = set.backup();
        set.clear();
        set.add(99);
        expect([...set]).toEqual([99]);
        restore();
        expect([...set]).toEqual([1, 2, 3]);
      });

      test('backup with transform function', () => {
        const restore = set.backup(s => new ExSet([...s].map(x => x * 2)));
        set.clear();
        restore();
        expect([...set]).toEqual([2, 4, 6]);
      });
    });
  });

  describe('edge cases', () => {
    test('empty set operations', () => {
      const empty = new ExSet<number>();
      const set = new ExSet([1, 2, 3]);

      expect(empty.intersects(set)).toBe(false);
      expect([...empty.or(set)]).toEqual([1, 2, 3]);
      expect([...empty.and(set)]).toEqual([]);
      expect([...empty.xor(set)]).toEqual([1, 2, 3]);
      expect([...set.xor(empty)]).toEqual([1, 2, 3]);
    });

    test('operations with non-Set iterables', () => {
      const set = new ExSet([1, 2, 3]);
      const array = [2, 3, 4];

      expect([...set.or(array)]).toEqual([1, 2, 3, 4]);
      expect([...set.and(array)]).toEqual([2, 3]);
      expect([...set.xor(array)]).toEqual([1, 4]);
    });
  });
});
