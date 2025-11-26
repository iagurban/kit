import { sortedIndexOf } from 'lodash';

import { ProgrammingError } from './errors/programming-error';
import { notNull } from './flow/not-null';
import { NumberBase } from './numbers/number-base';
import { NumberConverter } from './numbers/number-converter';

/**
 * Indicates there isn't enough space between keys to perform the requested insertion
 */
class NoSpaceError extends Error {}

/**
 * Represents a balancing window around a specific index in a sorted array.
 * Used internally by ManualSortingAlphabet to progressively include neighbors for rebalancing.
 *
 * **Side effect**: Mutates `actualSorted` and `actualIndex` when rebalance() is called.
 */
export class Balancer {
  leftRebalanced = 0;
  rightRebalanced = 0;
  actualSorted: string[];
  actualIndex: number;

  constructor(
    private readonly keyIndex: number,
    private readonly originalSorted: readonly string[],
    private readonly extendWindow: (b: Balancer) => {
      left: number;
      right: number;
    } = () => ({
      left: 1,
      right: 2,
    })
  ) {
    this.actualSorted = [...originalSorted];
    this.actualIndex = keyIndex;
  }

  total(count: number) {
    return count + this.leftRebalanced + this.rightRebalanced;
  }

  get isAtEndKey(): boolean {
    return this.actualIndex >= this.actualSorted.length - 1;
  }

  /**
   * Calculates the next window size based on the extension strategy.
   * Throws if window cannot grow further or growth is invalid.
   */
  getNextWindow(): { leftRebalanced: number; rightRebalanced: number } {
    const delta = this.extendWindow(this);

    if (delta.left < 0 || delta.right < 0) {
      throw new ProgrammingError('Window must always grow');
    }
    if (delta.left === 0 && delta.right === 0) {
      throw new ProgrammingError('Window growth must affect at least one side');
    }

    const maxLeft = this.keyIndex;
    const maxRight = this.originalSorted.length - this.keyIndex - 1;

    const newLeft = Math.min(this.leftRebalanced + delta.left, maxLeft);
    const newRight = Math.min(this.rightRebalanced + delta.right, maxRight);

    if (newLeft === this.leftRebalanced && newRight === this.rightRebalanced) {
      throw new ProgrammingError('Balance window exhausted — insertAfter cycle is broken');
    }

    return {
      leftRebalanced: newLeft,
      rightRebalanced: newRight,
    };
  }

  /**
   * Expands the balancing window and removes affected items from actualSorted.
   */
  rebalance(): void {
    const prevLeft = this.leftRebalanced;
    const prevRight = this.rightRebalanced;

    const { leftRebalanced, rightRebalanced } = this.getNextWindow();

    const deltaLeft = leftRebalanced - prevLeft;
    const deltaRight = rightRebalanced - prevRight;

    this.leftRebalanced = leftRebalanced;
    this.rightRebalanced = rightRebalanced;

    const start = this.actualIndex - deltaLeft;
    this.actualSorted.splice(start, deltaLeft + deltaRight);
    this.actualIndex -= deltaLeft;
  }
}

/**
 * Configuration options for ManualSortingAlphabet
 *
 * @property extendWindow - Function to determine how the rebalancing window grows
 *                         Returns the number of positions to expand left and right
 * @property prependingStrategy - Strategy for inserting before the first item
 *                               'evenly' - Distributes space evenly
 *                               'right-of-mid' - Places new keys evenly from the middle to right
 */
type ManualSortingAlphabetOptions = Readonly<{
  converter: NumberConverter;

  extendWindow?: (b: Balancer) => {
    readonly left: number;
    readonly right: number;
  };
  prependingStrategy?: 'evenly' | 'right-of-mid';
}>;

export type Changes = Readonly<{
  updated: Map<string, string>;
  inserted: string[];
}>;

/**
 * Manages lexicographic keys for manually sorted lists, enabling dynamic insertions between items.
 *
 * This class generates unique string keys that maintain lexicographic ordering, allowing for:
 * - Inserting new items between existing ones
 * - Handling dense insertions through automatic rebalancing
 * - Managing a configurable alphabet range for key generation
 *
 * @example
 * ```typescript
 * const alphabet = new ManualSortingAlphabet({ converter: NumberBase.b62 }); // A-Z, a-z, 0-9
 * const firstKey = alphabet.getFirstKey(); // Returns middle character
 * const result = alphabet.insertAfter(['B', 'D'], 'B', 2); // Insert 2 keys after 'B'
 *
 * // Basic usage - inserting between existing keys
 * const alphabet = new ManualSortingAlphabet({ converter: NumberBase.b62 });
 * const { inserted } = alphabet.insertAfter(['B', 'D'], 'B', 1);
 * // inserted might contain ['C']
 *
 * // Handling rebalancing
 * const { inserted, updated } = alphabet.insertAfter(['B', 'C'], 'B', 2);
 * // updated might contain new values for 'C' to make room
 *
 * // Custom window extension strategy
 * const alphabet = new ManualSortingAlphabet({
 *   converter: NumberBase.b62,
 *   extendWindow: (b) => ({ left: 2, right: 2 })
 * });
 * ```
 */
export class ManualSortingAlphabet {
  /**
   * Common presets for ManualSortingAlphabet alphabet ranges.
   *
   * These presets define fromCodePoint and toCodePoint values
   * that are optimized for different use cases.
   *
   * All presets are compatible with UTF-8 PostgreSQL `text` columns
   * under standard collation (C or C.UTF-8), preserving binary sort order.
   */
  static presets = {
    /**
     * Human-readable preset using digits and Latin letters.
     * Includes '0'-'9', 'A'-'Z', 'a'-'z'
     *
     * - ✅ ASCII-safe
     * - ✅ JS sort: works with < and localeCompare
     * - ✅ PostgreSQL binary order safe
     * - ⚠️ Can require frequent rebalance in long-term dense lists
     */
    asciiFriendly: NumberBase.b62,

    /**
     * Invisible and rarely-used symbols from Unicode ranges.
     * Optimized for maximum spacing in systems where keys are not user-facing.
     *
     * - ✅ High entropy, compact keys
     * - ✅ UTF-8 and PostgreSQL-safe
     * - ❌ Not human-friendly
     */
    invisibleUnicode: new NumberConverter([['\u2000', '\u2fff']]),

    /**
     * Very wide range using CJK unified ideographs.
     * Suitable for systems needing extreme insert density with minimal key growth.
     *
     * - ✅ 6000+ chars of spacing
     * - ✅ JS/PostgreSQL binary order works
     * - ⚠️ Keys may appear unreadable or wide in editors
     */
    wideCJK: new NumberConverter([['\u3000', '\u9fff']]),
  } as const satisfies Record<string, NumberConverter>;

  /**
   * Creates a new ManualSortingAlphabet instance.
   *
   * @param options - Configuration options
   */
  constructor(public readonly options: ManualSortingAlphabetOptions) {}

  /**
   * Checks if a code point is within the configured alphabet range.
   */
  protected isValidCodePoint(code: number): boolean {
    return this.options.converter.digitsSet.has(code);
  }

  /**
   * Returns a middle code point between two valid code points.
   * The first code point can be undefined (supposed value === 0).
   * Can return undefined if no point can be calculated (when a=undefined and b=digits[0]).
   *
   * Throws if either point is outside the alphabet range.
   */
  protected getMiddleCodePoint(a: number | undefined, b: number): number | undefined {
    if (!this.isValidCodePoint(b)) {
      throw new RangeError('Code point "b" is out of alphabet range');
    }

    const bIndex = this.options.converter.byChar.get(b)!;
    if (a === undefined) {
      return bIndex >= 1n ? this.options.converter.digits[Math.floor(Number(bIndex / 2n))] : undefined;
    }

    if (!this.isValidCodePoint(a)) {
      throw new RangeError('Code point "a" is out of alphabet range');
    }
    const aIndex = this.options.converter.byChar.get(a)!;
    const midIndex = (aIndex + bIndex) / 2n;
    return this.options.converter.digits[Number(midIndex)]!;
  }

  /**
   * Applies updated values to original keys from the rebalance result.
   */
  protected extractUpdatedKeys(
    sorted: readonly string[],
    inserted: readonly string[],
    keyIndex: number,
    { leftRebalanced, rightRebalanced }: { leftRebalanced: number; rightRebalanced: number }
  ): Changes {
    const leftOld = sorted.slice(keyIndex - leftRebalanced, keyIndex);
    const rightOld = sorted.slice(keyIndex + 1, keyIndex + 1 + rightRebalanced);

    const leftNew = inserted.slice(0, leftRebalanced);
    const rightNew = inserted.slice(inserted.length - rightRebalanced);
    const newKeys = inserted.slice(leftRebalanced, inserted.length - rightRebalanced);

    const updated = new Map<string, string>();
    for (const [i, element] of leftOld.entries()) {
      updated.set(element, leftNew[i]);
    }
    for (const [i, element] of rightOld.entries()) {
      updated.set(element, rightNew[i]);
    }

    return { inserted: newKeys, updated };
  }

  /**
   * Returns a string key that is lexicographically between a and b.
   * Uses code points to compute midpoint recursively.
   */
  protected getMiddleKey(a: string, b: string): string {
    if (a === b) {
      throw new NoSpaceError(`No space between keys`);
    }
    if (a > b) {
      [a, b] = [b, a];
    }

    const result: number[] = [];
    const digits = this.options.converter.digits;

    for (let i = 0; ; i++) {
      const aCode = a.codePointAt(i);
      const bCode = b.codePointAt(i) ?? digits[digits.length - 1];

      if (aCode !== bCode) {
        const mid = this.getMiddleCodePoint(aCode, bCode);
        if (mid === undefined) {
          throw new NoSpaceError(`No space between keys`);
        }
        if (mid !== aCode && mid !== bCode) {
          result.push(mid);
          break;
        }
      }

      if (aCode === undefined) {
        break;
      }
      result.push(aCode);
    }

    return String.fromCodePoint(...result);
  }

  /**
   * Attempts to insert keys between two adjacent values in the sorted array.
   *
   * @param count - Number of keys to insert
   * @param sorted - Array of existing keys in sorted order
   * @param index - Index after which to insert the new keys
   * @returns Array of generated keys
   * @throws {NoSpaceError} If there isn't enough space between the adjacent values
   * @private
   */
  protected tryInsertAfterIndex(count: number, sorted: string[], index: number): string[] {
    const left = sorted[index] ?? (index < 0 ? '' : undefined);
    const right = sorted[index + 1];

    if (left == null || right == null) {
      throw new NoSpaceError('tryInsertAfterIndex requires valid left and right keys');
    }

    const sortedSet = new Set(sorted);
    const points = [left, right];

    let rest = count;
    while (rest > 0) {
      let insertedSomething = false;
      // Iterate all intervals and split the first one that has space
      for (let i = 0; i < points.length - 1; i++) {
        try {
          const mid = this.getMiddleKey(points[i], points[i + 1]);

          if (mid === points[i] || mid === points[i + 1] || sortedSet.has(mid)) {
            continue;
          }

          points.splice(i + 1, 0, mid);
          rest--;
          insertedSomething = true;
          // Break to restart the search, ensuring we split intervals from the start
          break;
        } catch (e) {
          if (e instanceof NoSpaceError) {
            // This interval is full, try the next one
            continue;
          }
          throw e; // Other error
        }
      }

      if (!insertedSomething) {
        // If we've iterated all intervals and couldn't insert, the space is full.
        throw new NoSpaceError('No space between keys');
      }
    }

    return points.slice(1, -1);
  }

  /**
   * Inserts keys after the last element by growing length.
   */
  protected tryInsertManyAtEnd(count: number, sorted: string[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const next = this.tryInsertAtEnd([...sorted, ...result]);
      result.push(next);
    }
    return result;
  }

  /**
   * Inserts keys before the first element by creating room.
   */
  protected tryInsertManyAtStart(count: number, sorted: string[]): string[] {
    if (sorted.length === 0) {
      throw new Error('tryInsertManyAtStart requires a non-empty sorted array');
    }

    const first = sorted[0];
    const midpoint = this.tryInsertAfterIndex(1, ['', first], 0)[0];
    return count === 1
      ? [midpoint]
      : [midpoint, ...this.tryInsertAfterIndex(count - 1, [midpoint, first], 0)];
  }

  /**
   * Appends a key at the end by extending the last key or adding a character.
   *
   * @throws {NoSpaceError}
   */
  protected tryInsertAtEnd(sorted: string[]): string {
    if (sorted.length === 0) {
      return this.getFirstKey();
    }

    const last = sorted[sorted.length - 1];
    const prev = sorted[sorted.length - 2] ?? '';
    const digits = this.options.converter.digits;
    const lastDigit = digits[digits.length - 1];

    if (last.length > prev.length) {
      const codes = Array.from(last).map(c => c.codePointAt(0)!);
      for (let i = codes.length - 1; i >= 0; i--) {
        if (codes[i] < lastDigit) {
          codes[i] = notNull(this.getMiddleCodePoint(codes[i], lastDigit));
          const candidate = String.fromCodePoint(...codes);
          if (!sorted.includes(candidate)) {
            return candidate;
          }
          break;
        }
      }
    }

    const next = last + this.getFirstKey();
    if (!sorted.includes(next)) {
      return next;
    }

    throw new NoSpaceError('Cannot insert at end — no space');
  }

  /**
   * Inserts one or more keys immediately after the given key in a sorted array.
   * If necessary space isn't available, automatically rebalances neighboring keys.
   *
   * @param sorted - Array of existing keys in sorted order
   * @param keyIndex - Reference index after which to insert
   * @param count - Number of new keys to insert
   * @returns {Object} Result containing new keys and any updated existing keys
   * @returns {string[]} result.inserted - Array of newly generated keys
   * @returns {Map<string, string>} result.updated - Map of original keys to their new values after rebalancing
   * @throws {Error} If the reference key is not found in the sorted array
   */
  protected insertAfterIndex(sorted: readonly string[], keyIndex: number, count: number): Changes {
    const balancing = new Balancer(keyIndex, sorted, this.options.extendWindow);

    for (;;) {
      const total = balancing.total(count);

      try {
        return balancing.isAtEndKey
          ? this.extractUpdatedKeys(
              sorted,
              this.tryInsertManyAtEnd(total, balancing.actualSorted),
              keyIndex,
              balancing
            )
          : this.extractUpdatedKeys(
              sorted,
              this.tryInsertAfterIndex(total, balancing.actualSorted, balancing.actualIndex),
              keyIndex,
              balancing
            );
      } catch (error) {
        if (error instanceof NoSpaceError) {
          balancing.rebalance();
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Inserts a specified number of items before a given index in a sorted array.
   *
   * @param {string[]} sorted - The sorted array of string elements where the insertion will occur.
   * @param {number} index - The index before which the new items will be inserted.
   * @param {number} count - The number of items to be inserted.
   * @return {{ inserted: string[], updated: Map<string, string> }}
   *         Returns an object containing two properties:
   *         - `inserted`: An array of the newly inserted keys.
   *         - `updated`: A map of the updated keys and their new keys.
   */
  protected insertBeforeIndex(sorted: readonly string[], index: number, count: number): Changes {
    if (index === 0) {
      let itemsToRebalance = 0;
      for (;;) {
        const total = count + itemsToRebalance;

        if (itemsToRebalance >= sorted.length) {
          // We have rebalanced the whole list. The only space left is at the very end.
          const newKeys = this.tryInsertManyAtEnd(total, []);
          const updated = new Map<string, string>();
          const rebalancedOld = sorted.slice(0, itemsToRebalance);
          const rebalancedNew = newKeys.slice(count);
          for (let i = 0; i < itemsToRebalance; i++) {
            updated.set(rebalancedOld[i], rebalancedNew[i]);
          }
          const inserted = newKeys.slice(0, count);
          return { inserted, updated };
        }

        const rightBoundary = sorted[itemsToRebalance];

        try {
          // We generate all keys in the newly available space between '' and rightBoundary
          const newKeys = this.tryInsertAfterIndex(total, [rightBoundary], -1);

          const updated = new Map<string, string>();
          const rebalancedOld = sorted.slice(0, itemsToRebalance);
          const rebalancedNew = newKeys.slice(count);

          for (let i = 0; i < itemsToRebalance; i++) {
            updated.set(rebalancedOld[i], rebalancedNew[i]);
          }

          const inserted = newKeys.slice(0, count);
          return { inserted, updated };
        } catch (e) {
          if (e instanceof NoSpaceError) {
            itemsToRebalance++;
            continue;
          }
          throw e;
        }
      }
    }

    return this.insertAfterIndex(sorted, index - 1, count);
  }

  /**
   * Returns the initial key to use if the list is empty.
   */
  getFirstKey(): string {
    const digits = this.options.converter.digits;
    return String.fromCodePoint(digits[Math.floor(digits.length / 2)]);
  }

  /**
   * Generates a new array of unique keys based on the specified count.
   *
   * @param {number} count - The number of keys to generate.
   * @return {string[]} An array containing the newly generated keys.
   */
  getNewKeys(count: number): string[] {
    const result = [this.getFirstKey()];
    for (let i = 0; i < count - 1; i++) {
      const next = this.tryInsertAtEnd([...result]);
      result.push(next);
    }
    return result;
  }

  insertAfter(sorted: readonly string[], key: string, count: number): Changes {
    if (count === 0) {
      return { inserted: [], updated: new Map() };
    }
    const keyIndex = sortedIndexOf(sorted, key);
    if (keyIndex === -1) {
      throw new Error(`Key "${key}" not found in sorted list`);
    }
    return this.insertAfterIndex(sorted, keyIndex, count);
  }

  insertBefore(sorted: readonly string[], key: string, count: number): Changes {
    if (count === 0) {
      return { inserted: [], updated: new Map() };
    }
    const index = sortedIndexOf(sorted, key);
    if (index === -1) {
      throw new Error(`Key "${key}" not found in sorted list`);
    }
    return this.insertBeforeIndex(sorted, index, count);
  }
}
