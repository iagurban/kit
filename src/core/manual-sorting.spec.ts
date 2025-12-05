import { checked } from './checks';
import { Balancer, Changes, ManualSortingAlphabet } from './manual-sorting';
import { isArraySortedUniq, ManualSortingAlphabetDebug } from './manual-sorting.debug';
import { NumberBase } from './numbers/number-base';
import { NumberConverter } from './numbers/number-converter';
import { AnyAnyFunction } from './types';

type Any = ReturnType<AnyAnyFunction>;

const checkSortedUnique = <T>(a: readonly T[]) => checked(a, isArraySortedUniq, () => `array is not sorted`);

// Function to apply changes to the original array
function applyChanges(oldArray: readonly string[], { updated, inserted }: Changes): string[] {
  const newArray = oldArray.map(key => updated.get(key) ?? key);
  newArray.push(...inserted);
  newArray.sort();
  return newArray;
}

const createAlphabet = (ranges: [string, string][], prependingStrategy?: 'evenly' | 'right-of-mid') => {
  return new ManualSortingAlphabetDebug({
    converter: new NumberConverter(ranges),
    prependingStrategy,
  });
};

describe('manual-sorting', () => {
  describe('Balancer', () => {
    describe('constructor', () => {
      it('should initialize with the given parameters', () => {
        const originalSorted = ['A', 'B', 'C', 'D'];
        const keyIndex = 2;
        const balancer = new Balancer(keyIndex, originalSorted);

        expect(balancer.actualSorted).toEqual(['A', 'B', 'C', 'D']);
        expect(balancer.actualIndex).toBe(keyIndex);
        expect(balancer.leftRebalanced).toBe(0);
        expect(balancer.rightRebalanced).toBe(0);
      });

      it('should use the default extendWindow function if not provided', () => {
        const balancer = new Balancer(1, ['A', 'B', 'C']);
        // The default function returns { left: 1, right: 2 }
        const nextWindow = balancer.getNextWindow();
        expect(nextWindow).toEqual({ leftRebalanced: 1, rightRebalanced: 1 });
      });
    });

    describe('total', () => {
      it('should calculate the total count including rebalanced sides', () => {
        const balancer = new Balancer(1, ['A', 'B', 'C']);
        balancer.leftRebalanced = 2;
        balancer.rightRebalanced = 3;

        const total = balancer.total(5);

        expect(total).toBe(10);
      });
    });

    describe('isAtEndKey', () => {
      it('should return true if the actual index is the last element', () => {
        const balancer = new Balancer(3, ['A', 'B', 'C', 'D']);
        balancer.actualIndex = 3;

        expect(balancer.isAtEndKey).toBe(true);
      });

      it('should return false if the actual index is not the last element', () => {
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D']);
        balancer.actualIndex = 2;

        expect(balancer.isAtEndKey).toBe(false);
      });

      it('should return true for a single-element array (index 0 is also last)', () => {
        const balancer = new Balancer(0, ['X']);
        expect(balancer.isAtEndKey).toBe(true);
      });
    });

    describe('getNextWindow', () => {
      it('should calculate the next balance window based on the extendWindow strategy', () => {
        const extendWindow = () => ({ left: 1, right: 1 });
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D'], extendWindow);

        const nextWindow = balancer.getNextWindow();

        expect(nextWindow).toEqual({ leftRebalanced: 1, rightRebalanced: 1 });
      });

      it('should throw an error if the window does not grow', () => {
        const extendWindow = () => ({ left: 0, right: 0 });
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D'], extendWindow);

        expect(() => balancer.getNextWindow()).toThrow('Window growth must affect at least one side');
      });

      it('should throw an error if the window grows negatively', () => {
        const extendWindow = () => ({ left: -1, right: 2 });
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D'], extendWindow);

        expect(() => balancer.getNextWindow()).toThrow('Window must always grow');
      });

      it('should throw an error when the window is exhausted', () => {
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D']);
        // Exhaust the window by expanding it to its maximum size
        balancer.leftRebalanced = 1;
        balancer.rightRebalanced = 2;
        // The next attempt to grow should fail
        expect(() => balancer.getNextWindow()).toThrow(
          'Balance window exhausted — insertAfter cycle is broken'
        );
      });

      it('should clamp growth to available space on one side', () => {
        // keyIndex = 2 -> maxLeft = 2, maxRight = 1 for ['A','B','C','D']
        const extendWindow = () => ({ left: 10, right: 0 });
        const balancer = new Balancer(2, ['A', 'B', 'C', 'D'], extendWindow);

        const next = balancer.getNextWindow();
        expect(next).toEqual({ leftRebalanced: 2, rightRebalanced: 0 });
      });
    });

    describe('rebalance', () => {
      it('should expand the window and remove items from the actualSorted array', () => {
        const extendWindow = () => ({ left: 1, right: 1 });
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D'], extendWindow);

        balancer.rebalance();

        // After expanding a window by 1 on each side, 'A' and 'B' are removed
        expect(balancer.actualSorted).toEqual(['C', 'D']);
        expect(balancer.actualIndex).toBe(0);
        expect(balancer.leftRebalanced).toBe(1);
        expect(balancer.rightRebalanced).toBe(1);
      });

      it('should support asymmetric window growth (left only)', () => {
        const extendWindow = () => ({ left: 2, right: 0 });
        // keyIndex=2 points to 'C' in ['A','B','C','D','E']
        const balancer = new Balancer(2, ['A', 'B', 'C', 'D', 'E'], extendWindow);

        balancer.rebalance();

        // Remove two on the left of index 2: remove ['A','B'] starting at start = 2 - 2 = 0 total 2
        expect(balancer.actualSorted).toEqual(['C', 'D', 'E']);
        // actualIndex moves left by deltaLeft (=2)
        expect(balancer.actualIndex).toBe(0);
        expect(balancer.leftRebalanced).toBe(2);
        expect(balancer.rightRebalanced).toBe(0);
      });
    });
  });

  describe('ManualSortingAlphabet', () => {
    const azAlphabet = createAlphabet([['A', 'Z']]);

    describe('constructor', () => {
      it('should initialize with a valid NumberConverter instance', () => {
        const alphabet = createAlphabet([['A', 'Z']]);
        expect(alphabet.options.converter.digits.length).toBe(26);
      });
    });

    describe('getFirstKey', () => {
      it('should return the middle key of the range', () => {
        expect(azAlphabet.getFirstKey()).toBe('N');
      });
    });

    describe('getNewKeys', () => {
      it('should generate the specified number of unique keys', () => {
        const keys = azAlphabet.getNewKeys(3);
        expect(keys.length).toBe(3);
        expect(keys[0]).toBe('N'); // First key
        expect(isArraySortedUniq(keys)).toBe(true);
      });

      it('should generate many strictly increasing keys without duplicates', () => {
        const keys = azAlphabet.getNewKeys(10);
        expect(new Set(keys).size).toBe(10);
        expect(isArraySortedUniq(keys)).toBe(true);
      });

      it('should generate a large number of unique, sorted keys', () => {
        const asciiAlphabet = createAlphabet([[' ', '~']]);
        const keys = asciiAlphabet.getNewKeys(1000);
        expect(keys.length).toBe(1000);
        expect(new Set(keys).size).toBe(1000);
        expect(isArraySortedUniq(keys)).toBe(true);
      });
    });

    describe('insertAfter', () => {
      it('should insert keys after a given key', () => {
        const sorted = ['B', 'D'];
        const changes = azAlphabet.insertAfter(sorted, 'B', 2);

        expect(changes.inserted).toEqual(['BM', 'C']);
        expect(changes.updated.size).toBe(0); // No rebalancing needed
        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['B', 'BM', 'C', 'D']);
      });

      it('should throw an error if key is not found', () => {
        expect(() => {
          azAlphabet.insertAfter(['A', 'B'], 'Z', 1);
        }).toThrow('Key "Z" not found in sorted list');
      });

      it('should append at the end when inserting after the last key', () => {
        const sorted = ['B', 'D'];
        const changes = azAlphabet.insertAfter(sorted, 'D', 3);

        expect(changes.inserted).toHaveLength(3);
        expect(changes.updated.size).toBe(0);
        const final = applyChanges(sorted, changes);
        expect(isArraySortedUniq(final)).toBe(true);
      });

      it('should handle zero count by returning no new keys and no updates', () => {
        const sorted = ['B', 'D'];
        const changes = azAlphabet.insertAfter(sorted, 'B', 0);
        expect(changes.inserted).toHaveLength(0);
        expect(changes.updated.size).toBe(0);
      });

      it('should not trigger rebalancing when space is available via longer keys', () => {
        const acAlphabet = createAlphabet([['A', 'C']]); // A, B, C
        const sorted = ['A', 'B'];
        const changes = acAlphabet.insertAfter(sorted, 'A', 1);

        expect(changes.inserted).toEqual(['AB']);
        expect(changes.updated.size).toBe(0);
        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['A', 'AB', 'B']);
      });
    });

    describe('insertBefore', () => {
      it('should insert keys before a given key', () => {
        const sorted = ['B', 'D'];
        const changes = azAlphabet.insertBefore(sorted, 'D', 1);

        expect(changes.inserted).toEqual(['C']);
        expect(changes.updated.size).toBe(0); // No rebalancing needed
        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['B', 'C', 'D']);
      });

      it('should throw an error if key is not found', () => {
        expect(() => {
          azAlphabet.insertBefore(['A', 'B'], 'Z', 1);
        }).toThrow('Key "Z" not found in sorted list');
      });

      it('should insert before the first key (default strategy) and keep order', () => {
        const sorted = ['B', 'D'];
        const changes = azAlphabet.insertBefore(sorted, 'B', 2);

        expect(changes.inserted).toEqual(['A', 'AM']);
        expect(changes.updated.size).toBe(0);
        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['A', 'AM', 'B', 'D']);
      });

      it('should support prepending strategy right-of-mid', () => {
        const alphabet = createAlphabet([['A', 'Z']], 'right-of-mid');
        const sorted = ['B', 'D'];
        const changes = alphabet.insertBefore(sorted, 'B', 3);

        expect(changes.inserted).toEqual(['A', 'AG', 'AM']);
        expect(changes.updated.size).toBe(0);
        const final = applyChanges(sorted, changes);
        expect(isArraySortedUniq(final)).toBe(true);
      });

      it('should handle zero count by returning no new keys and no updates (before)', () => {
        const sorted = ['B', 'D'];
        const changes = azAlphabet.insertBefore(sorted, 'D', 0);
        expect(changes.inserted).toHaveLength(0);
        expect(changes.updated.size).toBe(0);
      });
    });

    describe('rebalancing', () => {
      it('should rebalance by expanding the window', () => {
        const abAlphabet = createAlphabet([['A', 'B']]);
        let sorted = ['A'];

        // 1. Insert 'AB' after 'A'. No rebalance.
        let changes = abAlphabet.insertAfter(sorted, 'A', 1);
        sorted = applyChanges(sorted, changes);
        expect(sorted).toEqual(['A', 'AB']);

        // 2. Insert 'AA' between 'A' and 'AB'. No rebalance.
        changes = abAlphabet.insertAfter(sorted, 'A', 1);
        sorted = applyChanges(sorted, changes);
        expect(sorted).toEqual(['A', 'AA', 'AB']);

        // 3. Insert after 'A' again. No space between 'A' and 'AA'.
        // This triggers a rebalance.
        changes = abAlphabet.insertAfter(sorted, 'A', 1);

        // The balancer expands right, grabbing 'AA' and 'AB'.
        // It redistributes 1 new key + 2 rebalanced keys into the space between 'A' and the end.
        expect(changes.inserted).toEqual(['ABB']);
        expect(changes.updated).toEqual(
          new Map([
            ['AA', 'ABBB'],
            ['AB', 'ABBBB'],
          ])
        );
        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['A', 'ABB', 'ABBB', 'ABBBB']);
      });

      it('should rebalance forward when inserting at the start', () => {
        const azAlphabet = createAlphabet([['A', 'Z']]);
        const sorted = ['A', 'C'];

        // Forces rebalance because getMiddleKey('', 'A') throws NoSpaceError.
        // Rebalance expands to include 'C', finding space between '' and 'C'.
        const changes = azAlphabet.insertBefore(sorted, 'A', 1);

        // Rebalance needs 2 keys (1 insert, 1 for old 'A').
        // It finds space between '' and 'C', generating 'A' and 'B'.
        // New key for insertion is 'A'. Old 'A' is rebalanced to 'B'.
        expect(changes.inserted).toEqual(['A']);
        expect(changes.updated).toEqual(new Map([['A', 'B']]));

        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['A', 'B', 'C']);
      });

      it('should rebalance forward with right-of-mid strategy', () => {
        const azAlphabet = createAlphabet([['A', 'Z']], 'right-of-mid');
        const sorted = ['A', 'C'];

        // Forces rebalance, same as the default strategy.
        const changes = azAlphabet.insertBefore(sorted, 'A', 1);

        // The rebalance needs 2 keys.
        // The strategy tries to find space for 2 keys before 'C'.
        // It generates 'A' and 'B'.
        // The new key for insertion is 'A'. The old 'A' is rebalanced to 'B'.
        expect(changes.inserted).toEqual(['A']);
        expect(changes.updated).toEqual(new Map([['A', 'B']]));

        const final = applyChanges(sorted, changes);
        expect(final).toEqual(['A', 'B', 'C']);
      });

      it('should perform multiple rebalance cycles if needed', () => {
        const abAlphabet = createAlphabet([['A', 'B']]); // Tiny alphabet
        let sorted = ['B'];

        // 1. Insert 'A' before 'B'. No rebalance.
        let changes = abAlphabet.insertBefore(sorted, 'B', 1);
        sorted = applyChanges(sorted, changes);
        expect(changes.updated.size).toBe(0);
        expect(sorted).toEqual(['A', 'B']);

        // 2. Insert before 'A'. Rebalances 'A'.
        // No space between '' and 'A'. Expands to include 'B'.
        // Needs 2 keys in space before 'B'. Generates 'A', 'AA'.
        // Inserted: 'A'. Rebalanced: 'A' -> 'AA'.
        changes = abAlphabet.insertBefore(sorted, 'A', 1);
        expect(changes.inserted).toEqual(['A']);
        expect(changes.updated).toEqual(new Map([['A', 'AA']]));
        sorted = applyChanges(sorted, changes);
        expect(sorted).toEqual(['A', 'AA', 'B']);

        // 3. Insert before 'A' again. Deeper rebalance.
        // No space before 'A'. Rebalance 'A'.
        // No space before 'AA'. Rebalance 'A', 'AA'.
        // Needs 3 keys in space before 'B'. Generates 'A', 'AA', 'AAA'.
        // Inserted: 'A'. Rebalanced: 'A' -> 'AA', 'AA' -> 'AAA'.
        changes = abAlphabet.insertBefore(sorted, 'A', 1);
        expect(changes.inserted).toEqual(['A']);
        expect(changes.updated).toEqual(
          new Map([
            ['A', 'AA'],
            ['AA', 'AAA'],
          ])
        );

        sorted = applyChanges(sorted, changes);
        expect(sorted).toEqual(['A', 'AA', 'AAA', 'B']);
      });
    });

    describe('presets', () => {
      it('asciiFriendly preset has expected size and middle key in range', () => {
        const preset = ManualSortingAlphabet.presets.asciiFriendly;
        const alphabet = new ManualSortingAlphabetDebug({ converter: preset });
        expect(alphabet.options.converter.digits.length).toBe(preset.digits.length);
        const first = alphabet.getFirstKey();
        expect(first.length).toBeGreaterThan(0);
        // A first key should be within the ASCII digits+letters range
        const cp = first.codePointAt(0)!;
        expect(preset.digitsSet.has(cp)).toBe(true);
      });
    });

    describe('internal methods', () => {
      it('getMiddleCodePoint should throw RangeError for out-of-range codes', () => {
        const internalAlphabet = azAlphabet as Any;
        expect(() => internalAlphabet.getMiddleCodePoint(64, 70)).toThrow(
          'Code point "a" is out of alphabet range'
        );
        expect(() => internalAlphabet.getMiddleCodePoint(70, 91)).toThrow(
          'Code point "b" is out of alphabet range'
        );
      });

      it('tryInsertAfterIndex should throw NoSpaceError when no space is available', () => {
        const alphabet = createAlphabet([['A', 'Z']]);
        const internalAlphabet = alphabet as Any;
        // This should throw because 'A' is a prefix of 'AA', leaving no lexical space.
        expect(() => {
          const list = checkSortedUnique(['AZ', 'AZA']);
          const added = internalAlphabet.tryInsertAfterIndex(1, list, 0);
          const result = applyChanges(list, { inserted: added, updated: new Map() });
          console.log(added, result);
        }).toThrow('No space between keys');
      });

      it('tryInsertManyAtStart should throw error for empty array', () => {
        const internalAlphabet = azAlphabet as Any;
        expect(() => internalAlphabet.tryInsertManyAtStart(1, [])).toThrow(
          'tryInsertManyAtStart requires a non-empty sorted array'
        );
      });

      it('tryInsertAtEnd should return a new key when space is available', () => {
        const abAlphabet = createAlphabet([['A', 'B']]); // A, B
        const internalAb = abAlphabet as Any;
        const newKey = internalAb.tryInsertAtEnd(['A', 'B']);
        expect(newKey).toBe('BB');
      });

      describe('getMiddleKey', () => {
        const azAlphabet = createAlphabet([['A', 'Z']]);
        const azInternal = azAlphabet as Any;

        it('should find the middle key between two characters', () => {
          expect(azInternal.getMiddleKey('A', 'C')).toBe('B');
        });

        it('should create a longer key when no character is between', () => {
          // M is the middle of A-Z
          expect(azInternal.getMiddleKey('A', 'B')).toBe('AM');
          expect(azInternal.getMiddleKey('A', 'AB')).toBe('AA');
        });

        it('should create a longer key at the end of the alphabet', () => {
          expect(azInternal.getMiddleKey('Y', 'Z')).toBe('YM');
        });

        it('should find a key at the beginning', () => {
          // When finding a key before 'B', the middle of '' and 'B' is 'A'.
          expect(azInternal.getMiddleKey('', 'B')).toBe('A');
          expect(azInternal.getMiddleKey('', 'BBB')).toBe('A');
          expect(azInternal.getMiddleKey('', 'BA')).toBe('A');
          expect(azInternal.getMiddleKey('A', 'AAA')).toBe('AA');
        });

        it('should throw for a key at the beginning of the alphabet', () => {
          expect(() => azInternal.getMiddleKey('', '')).toThrow(`No space between keys`);
          expect(() => azInternal.getMiddleKey('A', 'A')).toThrow(`No space between keys`);
          expect(() => azInternal.getMiddleKey('', 'A')).toThrow(`No space between keys`);
          expect(() => azInternal.getMiddleKey('A', 'AA')).toThrow(`No space between keys`);
        });

        it('should handle swapped arguments', () => {
          expect(azInternal.getMiddleKey('C', 'A')).toBe('B');
        });

        it('should handle keys of different lengths', () => {
          expect(azInternal.getMiddleKey('A', 'AC')).toBe('AB');
        });

        it('should return a key between two multi-character keys', () => {
          expect(azInternal.getMiddleKey('ABC', 'ABE')).toBe('ABD');
        });

        it('should handle another prefix case', () => {
          expect(azInternal.getMiddleKey('A', 'AB')).toBe('AA');
          expect(azInternal.getMiddleKey('A', 'AZ')).toBe('AM');
        });

        it('should work with a tiny alphabet', () => {
          const acAlphabet = createAlphabet([['A', 'C']]);
          const acInternal = acAlphabet as Any;
          // Between A and B, extend with mid of alphabet (B) -> AB
          expect(acInternal.getMiddleKey('A', 'B')).toBe('AB');
        });

        it('should throw when no space is available', () => {
          const abAlphabet = createAlphabet([['A', 'B']]);
          const abInternal = abAlphabet as Any;
          // Between A and AA, there is no space because A is a prefix of AA.
          expect(() => abInternal.getMiddleKey('A', 'AA')).toThrow('No space between keys');
        });
      });
    });
  });

  describe('error handling and edge cases', () => {
    const azAlphabet = createAlphabet([['A', 'Z']]);
    const abAlphabet = createAlphabet([['A', 'B']]);

    it('should throw when trying to insert before in an empty array via internal method', () => {
      const internalAlphabet = azAlphabet as Any;
      expect(() => internalAlphabet.tryInsertManyAtStart(1, [])).toThrow(
        'tryInsertManyAtStart requires a non-empty sorted array'
      );
    });

    it('should throw when trying to insert with invalid indices via internal method', () => {
      const internalAlphabet = azAlphabet as Any;
      // index 1 is out of bounds for right key in a single-element array
      expect(() => internalAlphabet.tryInsertAfterIndex(1, ['A'], 1)).toThrow(
        'tryInsertAfterIndex requires valid left and right keys'
      );
    });

    it('should not throw when rebalancing window is exhausted during insertBefore', () => {
      const tinyAlphabet = createAlphabet([['A', 'B']]);
      const sorted = ['A'];
      // This will continuously fail to find space, but should not exhaust the rebalance window.
      const changes = tinyAlphabet.insertBefore(sorted, 'A', 1);
      const final = applyChanges(sorted, changes);
      expect(final).toEqual(['B', 'BB']);
    });

    it('tryInsertAtEnd should never throw', () => {
      const abAlphabet = createAlphabet([['A', 'B']]);
      const longKey = 'B'.repeat(40);
      const sorted = [longKey];
      const changes = abAlphabet.insertAfter(sorted, longKey, 1);
      expect(changes.inserted[0]).toBe('B'.repeat(41));
    });

    it('should trigger rebalancing that updates keys on the right', () => {
      const abAlphabet = createAlphabet([['A', 'B']]);
      const sorted = ['A', 'B'];
      // Insert between A and B, but there is no single character.
      // getMiddleKey('A', 'B') -> 'AA'.
      const changes1 = abAlphabet.insertAfter(sorted, 'A', 1);
      const sorted1 = applyChanges(sorted, changes1);
      expect(sorted1).toEqual(['A', 'AA', 'B']);

      // Now insert again. No space between 'A' and 'AA'.
      // This will trigger rebalance.
      // keyIndex = 0.
      // extendWindow -> left=1, right=2. maxLeft=0, maxRight=1.
      // newLeft=0, newRight=1.
      // rightRebalanced will be 1. It will rebalance 'AA'.
      const changes2 = abAlphabet.insertAfter(sorted1, 'A', 1);
      expect(changes2.updated.size).toBeGreaterThan(0);
      expect(changes2.updated.has('AA')).toBe(true);
    });
  });
  describe('coverage tests', () => {
    const azAlphabet = createAlphabet([['A', 'Z']]);
    it('should trigger rebalancing that updates keys on the left', () => {
      const tinyAlphabet = createAlphabet([['A', 'C']]); // A, B, C
      const s2 = ['A', 'B', 'C'];
      const changes5 = tinyAlphabet.insertAfter(s2, 'B', 1);
      const s3 = applyChanges(s2, changes5);
      expect(s3).toEqual(['A', 'B', 'BB', 'C']);

      const changes6 = tinyAlphabet.insertAfter(['A', 'B', 'BA', 'C'], 'B', 1);
      expect(changes6.updated).toStrictEqual(
        new Map([
          ['A', 'CB'],
          ['BA', 'CBBB'],
          ['C', 'CBBBB'],
        ])
      );
      expect(changes6.inserted).toStrictEqual(['CBB']);
    });
    it('tryInsertAtEnd should return first key for empty array', () => {
      const internal = azAlphabet as Any;
      const key = internal.tryInsertAtEnd([]);
      expect(key).toBe('N');
    });
    it('should propagate errors from underlying methods', () => {
      const sorted = ['A', 'c'];
      expect(() => azAlphabet.insertAfter(sorted, 'A', 1)).toThrow('DEBUG: insertAfter array is not sorted');
      expect(() => azAlphabet.insertBefore(sorted, 'c', 1)).toThrow(
        'DEBUG: insertBefore array is not sorted'
      );
    });
    it('tryInsertManyAtStart should insert keys at the beginning', () => {
      const internal = azAlphabet as Any;
      const sorted = ['C', 'D'];
      const newKeys = internal.tryInsertManyAtStart(2, sorted);
      expect(newKeys).toEqual(['B', 'BM']);
    });
    it('tryInsertManyAtStart should insert one key at the beginning', () => {
      const internal = azAlphabet as Any;
      const sorted = ['C', 'D'];
      const newKeys = internal.tryInsertManyAtStart(1, sorted);
      expect(newKeys).toEqual(['B']);
    });
    it('should rebalance at start with tiny alphabet instead of throwing', () => {
      const tinyAlphabet = createAlphabet([['A', 'B']]);
      const sorted = ['A'];
      const changes = tinyAlphabet.insertBefore(sorted, 'A', 1);
      expect(changes.inserted).toEqual(['B']);
      expect(changes.updated).toEqual(new Map([['A', 'BB']]));
      const final = applyChanges(sorted, changes);
      expect(final).toEqual(['B', 'BB']);
    });

    it('should not throw when inserting many keys that require rebalancing', () => {
      const tinyAlphabet = createAlphabet([['A', 'B']]);
      const sorted = ['A', 'B'];
      const changes = tinyAlphabet.insertAfter(sorted, 'A', 100);
      expect(changes.inserted.length).toBe(100);
      const final = applyChanges(sorted, changes);
      expect(final.length).toBe(102);
      expect(isArraySortedUniq(final)).toBe(true);
    });

    it('should rebalance fully rather than throwing when window is exhausted', () => {
      const abAlphabet = createAlphabet([['A', 'B']]);
      const sorted = ['A', 'B'];
      // Exhaust the space between A and B
      let s = applyChanges(sorted, abAlphabet.insertAfter(sorted, 'A', 1)); // A, AA, B
      s = applyChanges(s, abAlphabet.insertAfter(s, 'A', 1)); // A, AAA, AA, B
      s = applyChanges(s, abAlphabet.insertAfter(s, 'A', 1)); // A, AAAA, AAA, AA, B
      const changes = abAlphabet.insertAfter(s, 'A', 1);
      expect(changes.inserted).toEqual(['BBA']);
      expect(changes.updated).toStrictEqual(
        new Map([
          ['AA', 'BBAA'],
          ['BB', 'BBAAA'],
        ])
      );
      const final = applyChanges(s, changes);
      expect(isArraySortedUniq(final)).toBe(true);
    });

    it('should handle insertAfter at the end of a list', () => {
      const sorted = ['A', 'B'];
      const changes = azAlphabet.insertAfter(sorted, 'B', 2);
      const final = applyChanges(sorted, changes);
      expect(final).toEqual(['A', 'B', 'BN', 'BT']);
      expect(isArraySortedUniq(final)).toBe(true);
    });

    it('should handle insertBefore at the beginning of a list', () => {
      const sorted = ['Y', 'Z'];
      const changes = azAlphabet.insertBefore(sorted, 'Y', 2);
      const final = applyChanges(sorted, changes);
      expect(final).toEqual(['G', 'M', 'Y', 'Z']);
      expect(isArraySortedUniq(final)).toBe(true);
    });
  });

  describe('error coverage', () => {
    it('should re-throw unexpected errors in insertAfter', () => {
      const alphabet = new ManualSortingAlphabet({ converter: NumberBase.b62 });
      // '$' is not in the b62 alphabet. To trigger the error, the invalid character must be
      // processed by getMiddleKey. This happens if we try to insert between 'A' and 'A$'.
      const sortedWithInvalidKey = ['A', 'A$'];
      expect(() => alphabet.insertAfter(sortedWithInvalidKey, 'A', 1)).toThrow(RangeError);
    });

    it('should re-throw unexpected errors in insertBefore', () => {
      const alphabet = new ManualSortingAlphabet({ converter: NumberBase.b62 });
      // The array must be sorted for sortedIndexOf to work. '$' comes before 'A'.
      // We insert before '$C', which will try to find a key between '' and '$C',
      // triggering the RangeError on the '$' character.
      const sortedWithInvalidKey = ['$C', 'A'];
      expect(() => alphabet.insertBefore(sortedWithInvalidKey, '$C', 1)).toThrow(RangeError);
    });

    it('tryInsertAfterIndex should throw NoSpaceError when space is exhausted', () => {
      // Using a minimal alphabet where 'A' is the first character.
      const converter = new NumberConverter([['A', 'B']]);
      const alphabet = new ManualSortingAlphabet({ converter });
      const sorted = ['A'];

      const internalAlphabet = alphabet as any;

      // Attempting to insert before 'A' (index -1) will try to find a key between '' and 'A'.
      // Since 'A' is the first character in the alphabet, no such key exists, and it should throw.
      expect(() => internalAlphabet.tryInsertAfterIndex(1, sorted, -1)).toThrow('No space between keys');
    });

    it('should hit the collision safeguard with unsorted input', () => {
      const alphabet = createAlphabet([['A', 'E']]);
      // Bypassing the debug check to test the production safeguard against unsorted input.
      const fn = ManualSortingAlphabet.prototype['tryInsertAfterIndex'];
      const unsorted = ['A', 'E', 'C']; // C is between A and E

      // We try to insert 1 key between 'A' and 'E'.
      // getMiddleKey('A', 'E') will produce 'C'.
      // The code will check if 'C' is in the sortedSet, which it is.
      // It will hit `continue`.
      // Since there are no other intervals in `points`, it will fail to insert.
      // This will cause `insertedSomething` to be false, and it will throw NoSpaceError.
      expect(() => fn.call(alphabet, 1, unsorted, 0)).toThrow('No space between keys');
    });
  });
});
