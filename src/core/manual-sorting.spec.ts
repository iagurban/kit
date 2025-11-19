import { Balancer, ManualSortingAlphabet } from './manual-sorting';

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
        const extendWindow = () => ({ left: 1, right: 2 });
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D'], extendWindow);

        const nextWindow = balancer.getNextWindow();

        expect(nextWindow).toEqual({ leftRebalanced: 1, rightRebalanced: 2 });
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

      it('should throw an error if the window exceeds the limits', () => {
        const extendWindow = () => ({ left: 5, right: 5 });
        const balancer = new Balancer(1, ['A', 'B', 'C', 'D'], extendWindow);

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
    describe('constructor', () => {
      it('should initialize with valid fromCodePoint and toCodePoint', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        expect(alphabet.size).toBe(26);
      });

      it('should throw an error for an invalid alphabet range', () => {
        expect(() => {
          void new ManualSortingAlphabet({ fromCodePoint: 90, toCodePoint: 65 });
        }).toThrow('Invalid alphabet range');
      });
    });

    describe('getFirstKey', () => {
      it('should return the middle key of the range', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        expect(alphabet.getFirstKey()).toBe('M');
      });
    });

    describe('getNewKeys', () => {
      it('should generate the specified number of unique keys', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const keys = alphabet.getNewKeys(3);
        expect(keys.length).toBe(3);
        expect(keys[0]).toBe('M'); // First key
        expect(keys[1] > keys[0]).toBe(true);
      });

      it('should generate many strictly increasing keys without duplicates', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const keys = alphabet.getNewKeys(10);
        expect(new Set(keys).size).toBe(10);
        for (let i = 1; i < keys.length; i++) {
          expect(keys[i] > keys[i - 1]).toBe(true);
        }
      });
    });

    describe('insertAfter', () => {
      it('should insert keys after a given key', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertAfter(sorted, 'B', 2);

        expect(newKeys).toHaveLength(2);
        // A first insertion creates a key between B and C -> 'BM', then 'C'
        expect(newKeys[0]).toBe('BM');
        expect(newKeys[1]).toBe('C');
        expect(updated.size).toBe(0); // No rebalancing needed
      });

      it('should throw an error if key is not found', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        expect(() => {
          alphabet.insertAfter(['A', 'B'], 'Z', 1);
        }).toThrow('Key "Z" not found in sorted list');
      });

      it('should append at the end when inserting after the last key', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertAfter(sorted, 'D', 3);

        expect(newKeys).toHaveLength(3);
        // All new keys are greater than 'D' and strictly increasing
        for (const k of newKeys) {
          expect(k > 'D').toBe(true);
        }
        for (let i = 1; i < newKeys.length; i++) {
          expect(newKeys[i] > newKeys[i - 1]).toBe(true);
        }
        // No existing keys should need update for this simple case
        expect(updated.size).toBe(0);
      });

      it('should handle zero count by returning no new keys and no updates', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertAfter(sorted, 'B', 0);
        expect(newKeys).toHaveLength(0);
        expect(updated.size).toBe(0);
      });
    });

    describe('insertBefore', () => {
      it('should insert keys before a given key', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertBefore(sorted, 'D', 1);

        expect(newKeys).toHaveLength(1);
        // Between B and D with a single insertion yields 'C'
        expect(newKeys[0]).toBe('C');
        expect(updated.size).toBe(0); // No rebalancing needed
      });

      it('should throw an error if key is not found', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        expect(() => {
          alphabet.insertBefore(['A', 'B'], 'Z', 1);
        }).toThrow('Key "Z" not found in sorted list');
      });

      it('should insert before the first key (default strategy) and keep order', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertBefore(sorted, 'B', 2);

        expect(newKeys).toHaveLength(2);
        // All new keys are less than the first existing key and strictly increasing
        for (const k of newKeys) {
          expect(k < 'B').toBe(true);
        }
        for (let i = 1; i < newKeys.length; i++) {
          expect(newKeys[i] > newKeys[i - 1]).toBe(true);
        }
        expect(updated.size).toBe(0);
      });

      it('should support prepending strategy right-of-mid', () => {
        const alphabet = new ManualSortingAlphabet({
          fromCodePoint: 65,
          toCodePoint: 90,
          prependingStrategy: 'right-of-mid',
        });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertBefore(sorted, 'B', 3);

        expect(newKeys).toHaveLength(3);
        // Keys should be < 'B' and strictly increasing as we move towards 'B'
        for (const k of newKeys) {
          expect(k < 'B').toBe(true);
        }
        for (let i = 1; i < newKeys.length; i++) {
          expect(newKeys[i] > newKeys[i - 1]).toBe(true);
        }
        expect(updated.size).toBe(0);
      });

      it('should handle zero count by returning no new keys and no updates (before)', () => {
        const alphabet = new ManualSortingAlphabet({ fromCodePoint: 65, toCodePoint: 90 });
        const sorted = ['B', 'D'];
        const { newKeys, updated } = alphabet.insertBefore(sorted, 'D', 0);
        expect(newKeys).toHaveLength(0);
        expect(updated.size).toBe(0);
      });
    });

    describe('presets', () => {
      it('asciiFriendly preset has expected size and middle key in range', () => {
        const preset = ManualSortingAlphabet.presets.asciiFriendly;
        const alphabet = new ManualSortingAlphabet(preset);
        expect(alphabet.size).toBe(preset.toCodePoint - preset.fromCodePoint + 1);
        const first = alphabet.getFirstKey();
        expect(first.length).toBeGreaterThan(0);
        // A first key should be within the ASCII digits+letters range
        const cp = first.codePointAt(0)!;
        expect(cp).toBeGreaterThanOrEqual(preset.fromCodePoint);
        expect(cp).toBeLessThanOrEqual(preset.toCodePoint);
      });
    });
  });
});
