export type ReadonlyExSet<Value> = Omit<
  ExSet<Value>,
  `clear` | `add` | `delete` | `join` | `subtract` | `backup`
>;

export class ExSet<Value> {
  protected readonly _s: Set<Value>;

  constructor(values?: Iterable<Value>) {
    this._s = new Set<Value>(values);
  }

  // standard interface

  add(value: Value): this {
    this._s.add(value);
    return this;
  }

  clear(): void {
    this._s.clear();
  }

  delete(value: Value): boolean {
    return this._s.delete(value);
  }

  forEach(by: (value: Value, value2: Value, self: ExSet<Value>) => void, thisArg?: unknown): void {
    for (const value of this._s) {
      Function.prototype.call(by, thisArg, value, value, this);
    }
  }

  has(key: Value): boolean {
    return this._s.has(key);
  }

  get size(): number {
    return this._s.size;
  }

  [Symbol.iterator](): IterableIterator<Value> {
    return this._s[Symbol.iterator]();
  }

  get [Symbol.toStringTag](): string {
    return 'ExSet';
  }

  entries(): IterableIterator<[Value, Value]> {
    return this._s.entries();
  }

  keys(): IterableIterator<Value> {
    return this._s.keys();
  }

  values(): IterableIterator<Value> {
    return this._s.values();
  }

  // extended interface

  public intersects(other: Iterable<Value>): boolean {
    for (const o of other) {
      if (this.has(o)) {
        return true;
      }
    }
    return false;
  }

  public join(other: Iterable<Value>): this {
    for (const o of other) {
      this.add(o);
    }
    return this;
  }

  public subtract(other: Iterable<Value>): this {
    for (const o of other) {
      this.delete(o);
    }
    return this;
  }

  public or(other: Iterable<Value>): ExSet<Value> {
    return new ExSet<Value>(this).join(other);
  }

  public diff(other: Iterable<Value>): ExSet<Value> {
    return new ExSet<Value>(this).subtract(other);
  }

  public and(other: Iterable<Value>): ExSet<Value> {
    const r = new ExSet<Value>();
    for (const o of other instanceof Set || other instanceof ExSet ? other : new Set(other)) {
      if (this.has(o)) {
        r.add(o);
      }
    }
    return r;
  }

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

  public toArray<NewValue>(by: (value: Value) => NewValue): NewValue[] {
    return [...this].map(by);
  }

  get readonly(): ReadonlyExSet<Value> {
    return this;
  }

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

  backup(fn?: (o: ExSet<Value>) => ExSet<Value>) {
    const b = fn ? fn(this) : new ExSet<Value>(this);
    return () => {
      this.clear();
      this.join(b);
    };
  }
}
