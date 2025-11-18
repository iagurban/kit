/**
 * Extended Map implementation with additional utility methods and operations
 * @template Key - The type of keys in the map
 * @template Value - The type of values in the map
 */
export class ExMap<Key, Value> implements ReadonlyMap<Key, Value>, Map<Key, Value> {
  protected readonly _m: Map<Key, Value>;

  /**
   * Creates a new ExMap instance
   * @param pairs - Optional iterable of key-value pairs to initialize the map
   */
  constructor(pairs?: Iterable<[Key, Value]>) {
    this._m = new Map<Key, Value>(pairs);
  }

  // Standard Map Interface Methods

  /**
   * Removes all elements from the map
   * @mutates
   */
  clear(): void {
    this._m.clear();
  }

  /**
   * Removes a key and its associated value from the map
   * @param key - The key to remove
   * @returns true if the key existed and was removed, false otherwise
   * @mutates
   */
  delete(key: Key): boolean {
    return this._m.delete(key);
  }

  /**
   * Executes a callback for each key-value pair in the map
   * @param by - Function to execute for each element
   * @param thisArg - Value to use as 'this' when executing the callback
   */
  forEach(by: (value: Value, key: Key, self: ExMap<Key, Value>) => void): void {
    for (const [key, value] of this._m) {
      by(value, key, this);
    }
  }

  /**
   * Retrieves the value associated with a key
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if the key doesn't exist
   */
  get(key: Key): Value | undefined {
    return this._m.get(key);
  }

  /**
   * Checks if a key exists in the map
   * @param key - The key to check for
   * @returns true if the key exists, false otherwise
   */
  has(key: Key): boolean {
    return this._m.has(key);
  }

  /**
   * Associates a key with a value in the map
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns This map instance for chaining
   * @mutates
   */
  set(key: Key, value: Value): this {
    this._m.set(key, value);
    return this;
  }

  /** @returns The number of key-value pairs in the map */
  get size(): number {
    return this._m.size;
  }

  // Static Methods

  /**
   * Groups array elements by a key function, collecting values with the same key into arrays
   * @param input - Array to group
   * @param by - Function to derive the key for each element
   * @returns Map of keys to arrays of values
   */
  public static groupedBy<Value, Key>(
    input: Iterable<Value>,
    by: (value: Value) => Key
  ): ExMap<Key, Value[]> {
    const r = new ExMap<Key, Value[]>();
    for (const v of input) {
      r.update(by(v), old => {
        if (old) {
          old.push(v);
          return old;
        }
        return [v];
      });
    }
    return r;
  }

  /**
   * Creates a map from an array using a key function
   * @param input - Array to convert to a map
   * @param by - Function to derive the key for each element
   * @returns Map of derived keys to original values
   */
  public static mappedBy<Value, Key>(input: Iterable<Value>, by: (value: Value) => Key): ExMap<Key, Value> {
    const r = new ExMap<Key, Value>();
    for (const v of input) {
      r.set(by(v), v);
    }
    return r;
  }

  // Extended Interface Methods

  /**
   * Gets a value from the map or creates it if it doesn't exist
   * @param key - Key to look up or create
   * @param create - Function to create new value if key doesn't exist
   * @param onExisted - Optional callback when key already exists
   * @returns Existing or newly created value
   * @mutates when key doesn't exist
   */
  public getOrCreate(key: Key, create: (key: Key) => Value, onExisted?: (v: Value, k: Key) => void): Value {
    let v = this.get(key);
    if (v == null) {
      this.set(key, (v = create(key)));
    } else if (onExisted) {
      onExisted(v, key);
    }
    return v;
  }

  /**
   * Updates a value in the map based on its current value
   * @param key - Key to update
   * @param value - Function to compute new value from old value
   * @returns This map instance for chaining
   * @mutates
   */
  public update(key: Key, value: (old: Value | undefined, key: Key) => Value): this {
    return this.set(key, value(this.get(key), key));
  }

  /**
   * Creates a new map by transforming values while keeping the same keys
   * @param by - Function to transform values
   * @returns New map with transformed values
   */
  public mapEntries<NewValue>(by: (value: Value, key: Key) => NewValue): ExMap<Key, NewValue> {
    return new ExMap<Key, NewValue>([...this.entries()].map(([key, value]) => [key, by(value, key)]));
  }

  /**
   * Converts map entries to an array using a transform function
   * @param by - Function to transform each key-value pair
   * @returns Array of transformed values
   */
  public toArray<NewValue>(by: (value: Value, key: Key) => NewValue): NewValue[] {
    return [...this.entries()].map(([key, value]) => by(value, key));
  }

  /**
   * Converts map values to an array using a transform function
   * @param by - Function to transform each value
   * @returns Array of transformed values
   */
  public valuesToArray<NewValue>(by: (value: Value) => NewValue): NewValue[] {
    return [...this.values()].map(value => by(value));
  }

  /**
   * Removes multiple keys from the map
   * @param keys - Keys to remove
   * @returns This map instance for chaining
   * @mutates
   */
  public deleteKeys(keys: Iterable<Key>): this {
    for (const key of keys) {
      this.delete(key);
    }
    return this;
  }

  /**
   * Adds all entries from another iterable to this map
   * @param other - Iterable of key-value pairs to add
   * @returns This map instance for chaining
   * @mutates
   */
  public assign(other: Iterable<readonly [Key, Value]>): this {
    for (const [k, v] of other) {
      this.set(k, v);
    }
    return this;
  }

  /**
   * Creates a backup of the current map state and returns a restore function
   * @param fn - Optional transformation function to apply to the backup
   * @returns Function that when called restores the map to its backed up state
   */
  backup(fn?: (o: ExMap<Key, Value>) => ExMap<Key, Value>) {
    const b = fn ? fn(this) : new ExMap<Key, Value>(this);
    return () => {
      this.clear();
      this.assign(b);
    };
  }

  /**
   * Creates a new map containing only entries that satisfy the predicate
   * @param by - Predicate function to test entries
   * @returns New map with filtered entries
   */
  public filter<R extends Value>(by: (v: Value, k: Key) => v is R): ExMap<Key, R>;
  public filter(by: (v: Value, k: Key) => boolean): ExMap<Key, Value>;
  public filter(by: (v: Value, k: Key) => boolean): ExMap<Key, Value> {
    return new ExMap<Key, Value>([...this.entries()].filter(([key, value]) => by(value, key)));
  }

  /**
   * Creates an immutable version of this map
   * @returns Frozen map that throws on mutation attempts
   */
  public freeze(): Omit<
    ExMap<Key, Value>,
    'set' | 'delete' | 'clear' | 'deleteKeys' | 'update' | 'overwrite' | 'getOrCreate'
  > {
    const descriptor = {
      value() {
        throw new Error('Can not mutate frozen ExMap');
      },
      configurable: false,
      enumerable: false,
    };

    for (const k of ['set', 'delete', 'clear']) {
      Object.defineProperty(this, k, descriptor);
    }

    Object.freeze(this);
    return this;
  }

  // Iterator Methods

  /** @returns Iterator for [key, value] pairs */
  [Symbol.iterator](): MapIterator<[Key, Value]> {
    return this._m[Symbol.iterator]();
  }

  /** @returns Iterator for [key, value] pairs */
  entries(): MapIterator<[Key, Value]> {
    return this._m.entries();
  }

  /** @returns Iterator for map keys */
  keys(): MapIterator<Key> {
    return this._m.keys();
  }

  /** @returns Iterator for map values */
  values(): MapIterator<Value> {
    return this._m.values();
  }

  /** @returns The string tag for this object */
  get [Symbol.toStringTag](): string {
    return 'ExMap';
  }
}

export type ExMapKey<M extends ExMap<unknown, unknown>> = M extends ExMap<infer K, unknown> ? K : never;

export type ExMapValue<M extends ExMap<unknown, unknown>> = M extends ExMap<unknown, infer V> ? V : never;
