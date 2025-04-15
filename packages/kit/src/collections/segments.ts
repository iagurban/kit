import { sortedIndex } from 'lodash';

class SegmentsIterator implements Iterator<readonly [number, number]> {
  constructor(readonly raw: Segments['raw']) {}

  private _i = 0;

  next() {
    if (this._i < this.raw.length) {
      return { done: false, value: [this.raw[this._i++], this.raw[this._i++]] } as const;
    }
    return { done: true, value: undefined } as const;
  }
}

const rawSymbol: unique symbol = Symbol('Segments#rawSymbol');

export type Segment = readonly [number, number];

export class Segments {
  static strictEq = (a: number, b: number) => a === b;
  static epsilonEq =
    (e = 1e-4) =>
    (a: number, b: number) =>
      Math.abs(a - b) < e;

  constructor(
    segments?: readonly Segment[],
    options?: { [rawSymbol]?: number[]; eq?: (a: number, b: number) => boolean }
  ) {
    if (options) {
      this.raw = options?.[rawSymbol] || [];
      this.eq = options?.eq || Segments.strictEq;
    } else {
      this.raw = [];
      this.eq = Segments.strictEq;
    }

    if (segments) {
      for (const s of segments) {
        this.add(...s);
      }
    }
  }

  private readonly raw: number[];
  private readonly eq: (a: number, b: number) => boolean;

  toSegments(): readonly (readonly [number, number])[] {
    return [...this];
  }

  get [Symbol.toStringTag]() {
    return this.toSegments().toString();
  }

  [Symbol.iterator](): Iterator<readonly [number, number]> {
    return new SegmentsIterator(this.raw);
  }

  get size(): number {
    const l = this.raw.length / 2;
    const f = Math.floor(l);
    if (l !== f) {
      console.warn('raw length is not even:', this.raw.length);
    }
    return f;
  }

  get empty(): boolean {
    return this.raw.length === 0;
  }

  add(start: number, end: number): this {
    if (end < start || this.eq(start, end)) {
      return this;
    }

    const { raw } = this;
    if (raw.length < 1) {
      raw.push(start, end);
      return this;
    }

    const si = sortedIndex(raw, start);
    if (si >= raw.length) {
      raw.push(start, end);
      return this;
    }

    let ei = sortedIndex(raw, end);
    if (this.eq(raw[ei], end)) {
      ++ei;
    }
    const rm = ei - si;
    if (si % 2) {
      if (ei % 2) {
        raw.splice(si, rm);
      } else {
        raw.splice(si, rm, end);
      }
    } else {
      if (ei % 2) {
        raw.splice(si, rm, start);
      } else {
        raw.splice(si, rm, start, end);
      }
    }

    return this;
  }

  slice(start: number, end?: number): Segments {
    const { raw } = this;
    if (!raw.length || (end !== undefined && end <= start)) {
      return new Segments();
    }

    let si = sortedIndex(raw, start);
    let addStart = false;
    if (si % 2) {
      if (this.eq(start, raw[si])) {
        ++si;
      } else {
        addStart = true;
      }
    }

    let r: number[];
    if (end === undefined) {
      r = raw.slice(si);
    } else {
      const ei = sortedIndex(raw, end);
      r = raw.slice(si, ei);
      ei % 2 && r.push(end);
    }
    addStart && r.unshift(start);
    return new Segments(undefined, { [rawSymbol]: r, eq: this.eq });
  }

  contains(v: number): boolean {
    const { raw } = this;
    const si = sortedIndex(raw, v);
    return si % 2 === (raw[si] === v ? 0 : 1);
  }
}
