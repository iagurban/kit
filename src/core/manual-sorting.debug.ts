/* istanbul ignore file */

import { sortedIndexOf } from 'lodash-es';

import { isROArray } from './checks/basic';
import { checked } from './checks/checked';
import { isNumber } from './checks/is-number';
import { isSomeOf } from './checks/is-some-of';
import { isString } from './checks/is-string';
import { Changes, ManualSortingAlphabet } from './manual-sorting';

export class ManualSortingAlphabetDebug extends ManualSortingAlphabet {
  isValidKey(s: string) {
    return Array.from(s).every(c => this.options.converter.digitsSet.has(c.codePointAt(0)!));
  }

  checkIsNew(sorted: readonly string[], key: string) {
    if (sortedIndexOf(sorted, key) !== -1) {
      throw new Error(`DEBUG: key "${key}" already exists in sorted array`);
    }
    return key;
  }

  checkNews(sorted: readonly string[], keys: string[]) {
    for (const key of keys) {
      this.checkIsNew(sorted, key);
    }
    return keys;
  }

  checkChanges(sorted: readonly string[], changes: Changes) {
    const updated = new Set(sorted);
    for (const [src, dst] of changes.updated) {
      if (!updated.has(src)) {
        throw new Error(`DEBUG: key "${src}" not exists in sorted array`);
      }
    }

    const sorted2 = [];
    for (const s of sorted) {
      if (changes.updated.has(s)) {
        sorted2.push(changes.updated.get(s)!);
      } else {
        sorted2.push(s);
      }
    }

    sorted2.sort();
    for (const key of changes.inserted) {
      this.checkIsNew(sorted2, key);
    }

    return changes;
  }

  protected getMiddleKey(a: string, b: string): string {
    const result = super.getMiddleKey(a, b);

    if (a > b) {
      [a, b] = [b, a];
    }
    if (result < a || result > b) {
      throw new Error(`DEBUG: getMiddleKey(${a}, ${b}) = ${result}`);
    }
    return result;
  }

  protected getMiddleCodePoint(a: number | undefined, b: number): number | undefined {
    const result = super.getMiddleCodePoint(a, b);
    if (a != null && a > b) {
      throw new Error(`DEBUG: getMiddleCodePoint(${a}, ${b}) = ${result}`);
    }
    return result;
  }

  protected extractUpdatedKeys(
    sorted: readonly string[],
    inserted: readonly string[],
    keyIndex: number,
    balanceResult: { leftRebalanced: number; rightRebalanced: number }
  ): Changes {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: extractUpdatedKeys array is not sorted`);
    }
    return this.checkChanges(sorted, super.extractUpdatedKeys(sorted, inserted, keyIndex, balanceResult));
  }

  protected tryInsertAfterIndex(count: number, sorted: string[], index: number): string[] {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: tryInsertAfterIndex array is not sorted`);
    }
    return this.checkNews(sorted, super.tryInsertAfterIndex(count, sorted, index));
  }

  protected tryInsertManyAtEnd(count: number, sorted: string[]): string[] {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: tryInsertManyAtEnd array is not sorted`);
    }
    return this.checkNews(sorted, super.tryInsertManyAtEnd(count, sorted));
  }

  protected tryInsertManyAtStart(count: number, sorted: string[]): string[] {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: tryInsertManyAtStart array is not sorted`);
    }
    return this.checkNews(sorted, super.tryInsertManyAtStart(count, sorted));
  }

  protected tryInsertAtEnd(sorted: string[]): string {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: tryInsertAtEnd array is not sorted`);
    }
    return this.checkIsNew(sorted, super.tryInsertAtEnd(sorted));
  }

  protected insertAfterIndex(sorted: readonly string[], keyIndex: number, count: number): Changes {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: insertAfterIndex array is not sorted`);
    }
    return this.checkChanges(sorted, super.insertAfterIndex(sorted, keyIndex, count));
  }

  protected insertBeforeIndex(sorted: readonly string[], index: number, count: number): Changes {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: insertBeforeIndex array is not sorted`);
    }
    return this.checkChanges(sorted, super.insertBeforeIndex(sorted, index, count));
  }

  insertAfter(sorted: readonly string[], key: string, count: number): Changes {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: insertAfter array is not sorted`);
    }
    return this.checkChanges(sorted, super.insertAfter(sorted, key, count));
  }

  insertBefore(sorted: readonly string[], key: string, count: number): Changes {
    if (!isArraySortedUniq(sorted) || !sorted.every(c => this.isValidKey(c))) {
      throw new Error(`DEBUG: insertBefore array is not sorted`);
    }
    return this.checkChanges(sorted, super.insertBefore(sorted, key, count));
  }
}

export const isArraySortedUniq = <T>(arr: unknown): arr is T[] => {
  if (!isROArray(arr)) {
    return false;
  }
  if (arr.length < 2) {
    return true;
  }
  let prev = checked(arr[0], isSomeOf(isString, isNumber), () => `array items must be strings or numbers`);
  for (let i = 1; i < arr.length; i++) {
    const current = checked(
      arr[i],
      isSomeOf(isString, isNumber),
      () => `array items must be strings or numbers`
    );
    if (current <= prev) {
      return false;
    }
    prev = current;
  }
  return new Set(arr).size === arr.length;
};
