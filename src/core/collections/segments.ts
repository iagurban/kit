import { sortedIndex } from 'lodash-es';

/**
 * Iterator implementation for Segments class
 * Iterates over pairs of numbers representing segment boundaries
 */
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

/** Symbol for accessing raw array data in Segments options */
const rawSymbol: unique symbol = Symbol('Segments#rawSymbol');

/** Type representing a single segment as a tuple of start and end points */
export type Segment = readonly [number, number];

/**
 * Manages a collection of non-overlapping, ordered number segments
 * Automatically merges adjacent or overlapping segments and maintains order
 */
export class Segments {
  /**
   * Creates a new Segments instance
   * @param segments - Initial segments to add
   * @param options - Configuration options including raw data array and equality comparison
   */
  constructor(segments?: readonly Segment[], options?: { [rawSymbol]?: number[] }) {
    if (options) {
      this.raw = options?.[rawSymbol] || [];
    } else {
      this.raw = [];
    }

    if (segments) {
      for (const s of segments) {
        this.add(...s);
      }
    }
  }

  private readonly raw: number[];

  /**
   * Converts segments to an array of tuples
   * @returns Array of [start, end] segments
   */
  toSegments(): readonly (readonly [number, number])[] {
    return [...this];
  }

  /** @returns String representation of segments */
  get [Symbol.toStringTag]() {
    return this.toSegments().toString();
  }

  /** Makes class iterable over segments */
  [Symbol.iterator](): Iterator<readonly [number, number]> {
    return new SegmentsIterator(this.raw);
  }

  /** @returns Number of segments */
  get size(): number {
    const l = this.raw.length / 2;
    const f = Math.floor(l);
    /* istanbul ignore next */
    if (l !== f) {
      console.warn('raw length is not even:', this.raw.length);
    }
    return f;
  }

  /** @returns Whether the collection contains no segments */
  get empty(): boolean {
    return this.raw.length === 0;
  }

  /**
   * Adds a new segment, merging with existing segments if they overlap
   * @param start - Start point of new segment
   * @param end - End point of new segment
   * @returns This instance for chaining
   * @mutates
   */
  add(start: number, end: number): this {
    if (end <= start) {
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
    if (raw[ei] === end) {
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

  /**
   * Creates a new Segments instance containing only segments that fall within the specified range
   * @param start - Start of range to slice
   * @param end - Optional end of range to slice
   * @returns New Segments instance with segments in range
   */
  slice(start: number, end?: number): Segments {
    const { raw } = this;
    if (!raw.length || (end !== undefined && end <= start)) {
      return new Segments();
    }

    let si = sortedIndex(raw, start);
    let addStart = false;
    if (si % 2) {
      if (start === raw[si]) {
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
    return new Segments(undefined, { [rawSymbol]: r });
  }

  /**
   * Checks if a point is contained within any segment
   * @param v - Point to check
   * @returns true if point falls within any segment, false otherwise
   */
  contains(v: number): boolean {
    const { raw } = this;
    const si = sortedIndex(raw, v);
    return si % 2 === (raw[si] === v ? 0 : 1);
  }
}
