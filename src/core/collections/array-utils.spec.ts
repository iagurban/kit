import {
  ArrayMutators,
  buckets,
  mapArrayIfNotEmpty,
  pickRandomItems,
  samples,
  samplesBy,
} from './array-utils';

describe('Array Utilities', () => {
  describe('buckets', () => {
    it('should split array into buckets of specified size', () => {
      const input = [1, 2, 3, 4, 5, 6, 7];
      const result = buckets(input, 3);
      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should handle empty array', () => {
      expect(buckets([], 2)).toEqual([]);
    });

    it('should handle bucket size equal to array length', () => {
      expect(buckets([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    });
  });

  describe('samples', () => {
    it('should generate array of sequential numbers', () => {
      expect(samples(4)).toEqual([0, 1, 2, 3]);
    });

    it('should generate array using custom function', () => {
      expect(samples(3, idx => idx * 2)).toEqual([0, 2, 4]);
    });

    it('should handle zero length', () => {
      expect(samples(0)).toEqual([]);
    });
  });

  describe('samplesBy', () => {
    it('should generate array using mapping function', () => {
      expect(samplesBy(3, i => `item${i}`)).toEqual(['item0', 'item1', 'item2']);
    });

    it('should handle zero length', () => {
      expect(samplesBy(0, i => i)).toEqual([]);
    });
  });

  it('pickRandomItems should throw error for invalid count', () => {
    expect(() => pickRandomItems(-1, ['a', 'b'])).toThrow();
    expect(() => pickRandomItems(3, ['a', 'b'])).toThrow();
    expect(() => pickRandomItems(1.5, ['a', 'b'])).toThrow();
  });

  describe('pickRandomItems', () => {
    const mockRandom = jest.spyOn(Math, 'random');

    beforeEach(() => {
      mockRandom.mockReset();
    });

    afterAll(() => {
      mockRandom.mockRestore();
    });

    it('should pick specified number of random items', () => {
      mockRandom.mockReturnValueOnce(0.1).mockReturnValueOnce(0.6);
      const result = pickRandomItems(2, ['a', 'b', 'c', 'd']);
      expect(result).toHaveLength(2);
      expect(result.every(item => ['a', 'b', 'c', 'd'].includes(item))).toBe(true);
    });
  });

  describe('ArrayMutators', () => {
    describe('insert', () => {
      it('should insert element at specified position', () => {
        const arr = [1, 2, 4];
        const result = ArrayMutators.insert(arr, 3, 2);
        expect(result).toEqual([1, 2, 3, 4]);
        expect(arr).toEqual([1, 2, 4]); // Original unchanged
      });

      it('should mutate original array when specified', () => {
        const arr = [1, 2, 4];
        ArrayMutators.insert(arr, 3, 2, true);
        expect(arr).toEqual([1, 2, 3, 4]);
      });
    });

    describe('move', () => {
      it('should move element from one position to another', () => {
        const arr = [1, 2, 3, 4];
        const result = ArrayMutators.move(arr, 1, 3);
        expect(result).toEqual([1, 3, 4, 2]);
        expect(arr).toEqual([1, 2, 3, 4]); // Original unchanged
      });

      it('should mutate original array when specified', () => {
        const arr = [1, 2, 3, 4];
        ArrayMutators.move(arr, 1, 3, true);
        expect(arr).toEqual([1, 3, 4, 2]);
      });
    });

    describe('remove', () => {
      it('should remove elements starting at specified position', () => {
        const arr = [1, 2, 3, 4];
        const result = ArrayMutators.remove(arr, 1, 2);
        expect(result).toEqual([1, 4]);
        expect(arr).toEqual([1, 2, 3, 4]); // Original unchanged
      });

      it('should mutate original array when specified', () => {
        const arr = [1, 2, 3, 4];
        ArrayMutators.remove(arr, 1, 2, true);
        expect(arr).toEqual([1, 4]);
      });
    });

    describe('set', () => {
      it('should set value at specified position', () => {
        const arr = [1, 2, 3];
        const result = ArrayMutators.set(arr, 5, 1);
        expect(result).toEqual([1, 5, 3]);
        expect(arr).toEqual([1, 2, 3]); // Original unchanged
      });

      it('should mutate original array when specified', () => {
        const arr = [1, 2, 3];
        ArrayMutators.set(arr, 5, 1, true);
        expect(arr).toEqual([1, 5, 3]);
      });
    });
  });

  describe('mapArrayIfNotEmpty', () => {
    it('should map non-empty array using mapper function', () => {
      const result = mapArrayIfNotEmpty(
        [1, 2, 3],
        x => x * 2,
        () => 0
      );
      expect(result).toEqual([2, 4, 6]);
    });

    it('should return array with empty value for empty input', () => {
      const result = mapArrayIfNotEmpty(
        [],
        x => x * 2,
        () => 0
      );
      expect(result).toEqual([0]);
    });
  });
});
