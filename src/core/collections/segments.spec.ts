import { Segments } from './segments';

describe('Segments', () => {
  describe('construction and basic properties', () => {
    test('creates empty segments', () => {
      const segments = new Segments();
      expect(segments.empty).toBe(true);
      expect(segments.size).toBe(0);
      expect([...segments]).toEqual([]);
    });

    test('creates segments from initial array', () => {
      const segments = new Segments(
        [
          [1, 3],
          [5, 7],
        ],
        {}
      );
      expect(segments.empty).toBe(false);
      expect(segments.size).toBe(2);
      expect([...segments]).toEqual([
        [1, 3],
        [5, 7],
      ]);
    });

    test('handles invalid segments in constructor', () => {
      const segments = new Segments([
        [3, 1],
        [2, 2],
      ]); // end < start and equal points
      expect(segments.empty).toBe(true);
    });
  });

  describe('add method', () => {
    test('adds non-overlapping segments in order', () => {
      const segments = new Segments();
      segments.add(1, 3).add(5, 7);
      expect([...segments]).toEqual([
        [1, 3],
        [5, 7],
      ]);
    });

    test('merges overlapping segments', () => {
      const segments = new Segments();
      segments.add(1, 4).add(3, 6);
      expect([...segments]).toEqual([[1, 6]]);
    });

    test('merges adjacent segments', () => {
      const segments = new Segments();
      segments.add(1, 3).add(3, 5);
      expect([...segments]).toEqual([[1, 5]]);
    });

    test('handles multiple overlapping segments', () => {
      const segments = new Segments();
      segments
        .add(1, 4) // [1,4]
        .add(2, 3) // [1,4] (contained)
        .add(3, 6) // [1,6] (overlap)
        .add(8, 10) // [1,6], [8,10]
        .add(5, 9); // [1,10] (bridge gap)
      expect([...segments]).toEqual([[1, 10]]);
    });

    test('ignores invalid segments', () => {
      const segments = new Segments();
      segments.add(3, 1); // end < start
      segments.add(2, 2); // equal points
      expect(segments.empty).toBe(true);
    });

    test('merges with start equal to existing endpoint', () => {
      const segments = new Segments([[1, 3]]);
      segments.add(3, 5);
      expect([...segments]).toEqual([[1, 5]]);
    });

    test('merges with end equal to existing startpoint', () => {
      const segments = new Segments([[3, 5]]);
      segments.add(1, 3);
      expect([...segments]).toEqual([[1, 5]]);
    });

    test('adds a segment that contains an existing segment', () => {
      const segments = new Segments([[3, 4]]);
      segments.add(1, 6);
      expect([...segments]).toEqual([[1, 6]]);
    });

    test('adds a segment contained within an existing segment', () => {
      const segments = new Segments([[1, 6]]);
      segments.add(3, 4);
      expect([...segments]).toEqual([[1, 6]]);
    });
  });

  describe('contains method', () => {
    let segments: Segments;

    beforeEach(() => {
      segments = new Segments([
        [1, 4],
        [6, 8],
        [10, 12],
      ]);
    });

    test('detects points within segments', () => {
      expect(segments.contains(2)).toBe(true);
      expect(segments.contains(7)).toBe(true);
      expect(segments.contains(11)).toBe(true);
    });

    test('detects points at segment boundaries', () => {
      expect(segments.contains(1)).toBe(true);
      expect(segments.contains(3.99)).toBe(true);
      expect(segments.contains(6)).toBe(true);
      expect(segments.contains(7.99)).toBe(true);
    });

    test('detects points outside segments', () => {
      expect(segments.contains(0.99)).toBe(false);
      expect(segments.contains(4)).toBe(false);
      expect(segments.contains(8)).toBe(false);
      expect(segments.contains(12)).toBe(false);
    });

    test('returns false for empty segments', () => {
      const emptySegments = new Segments();
      expect(emptySegments.contains(5)).toBe(false);
    });

    test('handles infinity', () => {
      const segmentsWithInf = new Segments([[0, Infinity]]);
      expect(segmentsWithInf.contains(1000)).toBe(true);
      expect(segmentsWithInf.contains(Infinity)).toBe(false); // Infinity is exclusive
      expect(segments.contains(Infinity)).toBe(false);
      expect(segments.contains(-Infinity)).toBe(false);
    });
  });

  describe('slice method', () => {
    let segments: Segments;

    beforeEach(() => {
      segments = new Segments([
        [1, 4],
        [6, 8],
        [10, 12],
      ]);
    });

    test('slices from middle of one segment to middle of another', () => {
      const sliced = segments.slice(2, 7);
      expect([...sliced]).toEqual([
        [2, 4],
        [6, 7],
      ]);
    });

    test('slices with exact segment boundaries', () => {
      const sliced = segments.slice(1, 8);
      expect([...sliced]).toEqual([
        [1, 4],
        [6, 8],
      ]);
    });

    test('slices with points outside segments', () => {
      const sliced = segments.slice(0, 13);
      expect([...sliced]).toEqual([
        [1, 4],
        [6, 8],
        [10, 12],
      ]);
    });

    test('slices with end point only', () => {
      const sliced = segments.slice(7);
      expect([...sliced]).toEqual([
        [7, 8],
        [10, 12],
      ]);
    });

    test('returns empty segments for invalid ranges', () => {
      expect(segments.slice(8, 3).empty).toBe(true);
      expect(segments.slice(13, 14).empty).toBe(true);
    });

    test('slices from within a segment to undefined end', () => {
      const sliced = segments.slice(2.5);
      expect([...sliced]).toEqual([
        [2.5, 4],
        [6, 8],
        [10, 12],
      ]);
    });

    test('slices from a segment boundary to undefined end', () => {
      const sliced = segments.slice(6);
      expect([...sliced]).toEqual([
        [6, 8],
        [10, 12],
      ]);
    });

    test('slices within a single segment', () => {
      const sliced = segments.slice(1.5, 3.5);
      expect([...sliced]).toEqual([[1.5, 3.5]]);
    });

    test('slices a range covering multiple segments', () => {
      const sliced = segments.slice(3, 11);
      expect([...sliced]).toEqual([
        [3, 4],
        [6, 8],
        [10, 11],
      ]);
    });

    test('slices a range with no overlap', () => {
      const sliced = segments.slice(4, 6);
      expect([...sliced]).toEqual([]);
    });
  });

  describe('equality comparison', () => {
    test('uses strict equality by default', () => {
      const segments = new Segments();
      segments.add(1, 2).add(2, 3);
      expect([...segments]).toEqual([[1, 3]]);
    });
  });

  describe('iteration and conversion', () => {
    test('iterates over segments in order', () => {
      const segments = new Segments([
        [3, 4],
        [1, 2],
      ]);
      expect([...segments]).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    test('converts to array via toSegments', () => {
      const segments = new Segments([
        [1, 3],
        [5, 7],
      ]);
      expect(segments.toSegments()).toEqual([
        [1, 3],
        [5, 7],
      ]);
    });

    test('provides string representation', () => {
      const segments = new Segments([
        [1, 3],
        [5, 7],
      ]);
      expect(Object.prototype.toString.call(segments)).toContain('1,3,5,7');
    });
  });
});
