export class ExMap<Key, Value> {
  protected readonly _m: Map<Key, Value>;

  constructor(pairs?: Iterable<[Key, Value]>) {
    this._m = new Map<Key, Value>(pairs);
  }

  // standard interface

  clear(): void {
    this._m.clear();
  }

  delete(key: Key): boolean {
    return this._m.delete(key);
  }

  forEach(by: (value: Value, key: Key, self: ExMap<Key, Value>) => void, thisArg?: unknown): void {
    for (const [key, value] of this._m) {
      Function.prototype.call(by, thisArg, value, key, this);
    }
  }

  get(key: Key): Value | undefined {
    return this._m.get(key);
  }

  has(key: Key): boolean {
    return this._m.has(key);
  }

  set(key: Key, value: Value): this {
    this._m.set(key, value);
    return this;
  }

  get size(): number {
    return this._m.size;
  }

  [Symbol.iterator](): IterableIterator<[Key, Value]> {
    return this._m[Symbol.iterator]();
  }

  entries(): IterableIterator<[Key, Value]> {
    return this._m.entries();
  }

  keys(): IterableIterator<Key> {
    return this._m.keys();
  }

  values(): IterableIterator<Value> {
    return this._m.values();
  }

  get [Symbol.toStringTag](): string {
    return 'ExMap';
  }

  // statics

  public static groupedBy<Value, Key>(
    input: readonly Value[],
    by: (value: Value) => Key
  ): ExMap<Key, Value[]> {
    return input.reduce((r, v) => r.update(by(v), old => [...(old || []), v]), new ExMap<Key, Value[]>());
  }

  public static mappedBy<Value, Key>(input: readonly Value[], by: (value: Value) => Key): ExMap<Key, Value> {
    return input.reduce((r, v) => r.set(by(v), v), new ExMap<Key, Value>());
  }

  // extended interface

  public getOrCreate(key: Key, create: (key: Key) => Value, onExisted?: (v: Value, k: Key) => void): Value {
    let v = this.get(key);
    if (v == null) {
      this.set(key, (v = create(key)));
    } else if (onExisted) {
      onExisted(v, key);
    }
    return v;
  }

  public update(key: Key, value: (old: Value | undefined, key: Key) => Value): this {
    return this.set(key, value(this.get(key), key));
  }

  public mapEntries<NewValue>(by: (value: Value, key: Key) => NewValue): ExMap<Key, NewValue> {
    return new ExMap<Key, NewValue>([...this.entries()].map(([key, value]) => [key, by(value, key)]));
  }

  public toArray<NewValue>(by: (value: Value, key: Key) => NewValue): NewValue[] {
    return [...this.entries()].map(([key, value]) => by(value, key));
  }

  public valuesToArray<NewValue>(by: (value: Value) => NewValue): NewValue[] {
    return [...this.values()].map(value => by(value));
  }

  public deleteKeys(keys: Iterable<Key>): this {
    for (const key of keys) {
      this.delete(key);
    }
    return this;
  }

  public assign(other: Iterable<readonly [Key, Value]>): this {
    for (const [k, v] of other) {
      this.set(k, v);
    }
    return this;
  }

  backup(fn?: (o: ExMap<Key, Value>) => ExMap<Key, Value>) {
    const b = fn ? fn(this) : new ExMap<Key, Value>(this);
    return () => {
      this.clear();
      this.assign(b);
    };
  }

  public filter<R extends Value>(by: (v: Value, k: Key) => v is R): ExMap<Key, R>;
  public filter(by: (v: Value, k: Key) => boolean): ExMap<Key, Value>;

  public filter(by: (v: Value, k: Key) => boolean): ExMap<Key, Value> {
    return new ExMap<Key, Value>([...this.entries()].filter(([key, value]) => by(value, key)));
  }

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
}
