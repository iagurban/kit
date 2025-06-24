/** Type representing a read-only version of ExSet, excluding mutating methods */
export type ReadonlyExSet<Value> = Omit<
  ExSet<Value>,
  'clear' | 'add' | 'delete' | 'join' | 'subtract' | 'backup'
>;

/**
 * Extended Set implementation with additional set operations and utility methods.
 * Provides both standard Set interface and additional functionality for set operations.
 * @template Value - The type of elements in the set
 */
export class ExSet<Value> {
  protected readonly _s: Set<Value>;

  /**
   * Creates a new ExSet instance
   * @param values - Optional iterable of initial values
   */
  constructor(values?: Iterable<Value>) {
    this._s = new Set<Value>(values);
  }

  // Standard Set Interface Methods

  /**
   * Adds a value to the set
   * @param value - The value to add
   * @returns This set instance for chaining
   * @mutates
   */
  add(value: Value): this {
    this._s.add(value);
    return this;
  }

  /**
   * Removes all elements from the set
   * @mutates
   */
  clear(): void {
    this._s.clear();
  }

  /**
   * Removes a value from the set
   * @param value - The value to remove
   * @returns true if the value was in the set, false otherwise
   * @mutates
   */
  delete(value: Value): boolean {
    return this._s.delete(value);
  }

  /**
   * Executes a callback for each value in the set
   * @param by - Function to execute for each element
   * @param thisArg - Value to use as 'this' when executing the callback
   */
  forEach(by: (value: Value, value2: Value, self: ExSet<Value>) => void): void {
    for (const value of this._s) {
      by(value, value, this);
    }
  }

  /**
   * Checks if a value exists in the set
   * @param key - The value to check for
   * @returns true if the value exists, false otherwise
   */
  has(key: Value): boolean {
    return this._s.has(key);
  }

  /** @returns The number of elements in the set */
  get size(): number {
    return this._s.size;
  }

  // Extended Interface Methods

  /**
   * Checks if this set has any elements in common with another iterable
   * @param other - Iterable to check against
   * @returns true if there are common elements, false otherwise
   */
  public intersects(other: Iterable<Value>): boolean {
    for (const o of other) {
      if (this.has(o)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Adds all elements from another iterable to this set
   * @param other - Iterable whose elements will be added
   * @returns This set instance for chaining
   * @mutates
   */
  public join(other: Iterable<Value>): this {
    for (const o of other) {
      this.add(o);
    }
    return this;
  }

  /**
   * Removes all elements that exist in another iterable from this set
   * @param other - Iterable whose elements will be removed
   * @returns This set instance for chaining
   * @mutates
   */
  public subtract(other: Iterable<Value>): this {
    for (const o of other) {
      this.delete(o);
    }
    return this;
  }

  /**
   * Creates a new set containing elements from both this set and another iterable (union)
   * @param other - Iterable to union with
   * @returns A new ExSet containing all unique elements
   */
  public or(other: Iterable<Value>): ExSet<Value> {
    return new ExSet<Value>(this).join(other);
  }

  /**
   * Creates a new set containing elements from this set that are not in another iterable (difference)
   * @param other - Iterable to compare against
   * @returns A new ExSet containing elements unique to this set
   */
  public diff(other: Iterable<Value>): ExSet<Value> {
    return new ExSet<Value>(this).subtract(other);
  }

  /**
   * Creates a new set containing elements that exist in both this set and another iterable (intersection)
   * @param other - Iterable to intersect with
   * @returns A new ExSet containing common elements
   */
  public and(other: Iterable<Value>): ExSet<Value> {
    const r = new ExSet<Value>();
    for (const o of other instanceof Set || other instanceof ExSet ? other : new Set(other)) {
      if (this.has(o)) {
        r.add(o);
      }
    }
    return r;
  }

  /**
   * Creates a new set containing elements that exist in either this set or another iterable, but not both (symmetric difference)
   * @param other - Iterable to compare against
   * @returns A new ExSet containing elements that are in either set but not both
   */
  public xor(other: Iterable<Value>): ExSet<Value> {
    const r = new ExSet<Value>(this);
    for (const o of other instanceof Set || other instanceof ExSet ? other : new Set(other)) {
      if (r.has(o)) {
        r.delete(o);
      } else {
        r.add(o);
      }
    }
    return r;
  }

  /**
   * Transforms set elements into an array using a mapping function
   * @param by - Function to transform each element
   * @returns Array of transformed values
   */
  public toArray<NewValue>(by: (value: Value) => NewValue): NewValue[] {
    return [...this].map(by);
  }

  /** @returns A read-only view of this set */
  get readonly(): ReadonlyExSet<Value> {
    return this;
  }

  /**
   * Creates an immutable version of this set by freezing it and preventing mutations
   * @returns A read-only version of this set that throws on mutation attempts
   */
  public freeze(): ReadonlyExSet<Value> {
    const descriptor = {
      value() {
        throw new Error('Can not mutate frozen ExSet');
      },
      configurable: false,
      enumerable: false,
    };

    for (const k of ['add', 'delete', 'clear']) {
      Object.defineProperty(this, k, descriptor);
    }

    Object.freeze(this);

    return this;
  }

  /**
   * Creates a backup of the current set state and returns a restore function
   * @param fn - Optional transformation function to apply to the backup
   * @returns Function that when called restores the set to its backed up state
   * @mutates
   */
  backup(fn?: (o: ExSet<Value>) => ExSet<Value>) {
    const b = fn ? fn(this) : new ExSet<Value>(this);
    return () => {
      this.clear();
      this.join(b);
    };
  }

  // Iterator Methods

  /** @returns An iterator over the values in the set */
  [Symbol.iterator](): IterableIterator<Value> {
    return this._s[Symbol.iterator]();
  }

  /** @returns The string tag for this object */
  get [Symbol.toStringTag](): string {
    return 'ExSet';
  }

  /** @returns An iterator over [value, value] pairs for Set compatibility */
  entries(): IterableIterator<[Value, Value]> {
    return this._s.entries();
  }

  /** @returns An iterator over the values in the set */
  keys(): IterableIterator<Value> {
    return this._s.keys();
  }

  /** @returns An iterator over the values in the set */
  values(): IterableIterator<Value> {
    return this._s.values();
  }
}
