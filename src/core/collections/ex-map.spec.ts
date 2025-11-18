import { ExMap } from './ex-map';

describe('ExMap', () => {
  describe('standard Map interface', () => {
    let map: ExMap<string, number>;

    beforeEach(() => {
      map = new ExMap([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    test('constructor with initial pairs', () => {
      expect(map.size).toBe(3);
      expect(map.get('a')).toBe(1);
      expect(map.get('b')).toBe(2);
      expect(map.get('c')).toBe(3);
    });

    test('set and get', () => {
      map.set('d', 4);
      expect(map.get('d')).toBe(4);
      expect(map.size).toBe(4);
    });

    test('has', () => {
      expect(map.has('a')).toBe(true);
      expect(map.has('x')).toBe(false);
    });

    test('delete', () => {
      expect(map.delete('a')).toBe(true);
      expect(map.has('a')).toBe(false);
      expect(map.delete('x')).toBe(false);
    });

    test('clear', () => {
      map.clear();
      expect(map.size).toBe(0);
      expect(map.has('a')).toBe(false);
    });

    test('forEach', () => {
      const results: Array<[number, string, ExMap<string, number>]> = [];
      map.forEach((value, key, self) => {
        results.push([value, key, self]);
      });
      expect(results).toEqual([
        [1, 'a', map],
        [2, 'b', map],
        [3, 'c', map],
      ]);
    });

    test('iterators', () => {
      expect([...map.entries()]).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
      expect([...map.keys()]).toEqual(['a', 'b', 'c']);
      expect([...map.values()]).toEqual([1, 2, 3]);
      expect([...map]).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    test('Symbol.toStringTag', () => {
      expect(Object.prototype.toString.call(map)).toBe('[object ExMap]');
    });
  });

  describe('static methods', () => {
    test('groupedBy', () => {
      const input = [1, 2, 3, 4];
      const result = ExMap.groupedBy(input, n => n % 2);
      expect([...result.entries()]).toEqual([
        [1, [1, 3]],
        [0, [2, 4]],
      ]);
    });

    test('mappedBy', () => {
      const input = ['a1', 'b2', 'c3'];
      const result = ExMap.mappedBy(input, s => s[0]);
      expect([...result.entries()]).toEqual([
        ['a', 'a1'],
        ['b', 'b2'],
        ['c', 'c3'],
      ]);
    });
  });

  describe('extended interface', () => {
    let map: ExMap<string, number>;

    beforeEach(() => {
      map = new ExMap([
        ['a', 1],
        ['b', 2],
      ]);
    });

    test('getOrCreate', () => {
      const created = map.getOrCreate('c', () => 3);
      expect(created).toBe(3);
      expect(map.get('c')).toBe(3);

      const onExistedMock = jest.fn();
      const existing = map.getOrCreate('a', () => 99, onExistedMock);
      expect(existing).toBe(1);
      expect(onExistedMock).toHaveBeenCalledWith(1, 'a');
    });

    test('update', () => {
      map.update('a', v => (v || 0) + 1);
      expect(map.get('a')).toBe(2);

      map.update('c', (v, k) => (v || 0) + k.length);
      expect(map.get('c')).toBe(1);
    });

    test('mapEntries', () => {
      const result = map.mapEntries(v => v * 2);
      expect([...result.entries()]).toEqual([
        ['a', 2],
        ['b', 4],
      ]);
    });

    test('toArray', () => {
      const result = map.toArray((v, k) => `${k}:${v}`);
      expect(result).toEqual(['a:1', 'b:2']);
    });

    test('valuesToArray', () => {
      const result = map.valuesToArray(v => v * 2);
      expect(result).toEqual([2, 4]);
    });

    test('deleteKeys', () => {
      map.deleteKeys(['a', 'c']);
      expect([...map.entries()]).toEqual([['b', 2]]);
    });

    test('assign', () => {
      map.assign([
        ['c', 3],
        ['d', 4],
      ]);
      expect([...map.entries()]).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4],
      ]);
    });

    test('backup and restore', () => {
      const restore = map.backup();
      map.clear();
      expect(map.size).toBe(0);
      restore();
      expect([...map.entries()]).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });

    test('backup with transform function', () => {
      const restore = map.backup(m => m.mapEntries(v => v * 2));
      map.clear();
      restore();
      expect([...map.entries()]).toEqual([
        ['a', 2],
        ['b', 4],
      ]);
    });

    test('filter', () => {
      const result = map.filter(v => v > 1);
      expect([...result.entries()]).toEqual([['b', 2]]);
    });

    test('filter with type predicate', () => {
      const mixedMap = new ExMap<string, number | string>([
        ['a', 1],
        ['b', 'text'],
        ['c', 2],
      ]);
      const result = mixedMap.filter((v): v is number => typeof v === 'number');
      expect([...result.entries()]).toEqual([
        ['a', 1],
        ['c', 2],
      ]);
    });

    test('freeze', () => {
      const frozen = map.freeze();
      expect(() => (frozen as typeof frozen & { set(s: string, v: number): void }).set('c', 3)).toThrow(
        'Can not mutate frozen ExMap'
      );
      expect(() => (frozen as typeof frozen & { delete(s: string): void }).delete('a')).toThrow(
        'Can not mutate frozen ExMap'
      );
      expect(() => (frozen as typeof frozen & { clear(): void }).clear()).toThrow(
        'Can not mutate frozen ExMap'
      );
      expect(frozen.get('a')).toBe(1);
    });
  });
});
