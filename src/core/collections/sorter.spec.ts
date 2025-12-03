import { sorter } from './sorter';

describe('sorter', () => {
  type TestObject = {
    id: number;
    name: string;
    value: number;
    category?: string | null;
  };

  const testData: TestObject[] = [
    { id: 1, name: 'Charlie', value: 30, category: 'A' },
    { id: 2, name: 'Alpha', value: 20, category: 'B' },
    { id: 3, name: 'Bravo', value: 20, category: 'A' },
    { id: 4, name: 'Charlie', value: 10, category: null },
    { id: 5, name: 'Alpha', value: 30, category: 'B' },
  ];

  // Helper to run a sort and return the sorted IDs
  const getSortedIds = (data: TestObject[], sortFn: (a: TestObject, b: TestObject) => number) =>
    [...data].sort(sortFn).map(o => o.id);

  it('should sort by a single numeric field in ascending order', () => {
    const sortFn = sorter<TestObject>(h => [h.field(o => o.value)]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([4, 2, 3, 1, 5]);
  });

  it('should sort by a single string field in ascending order', () => {
    const sortFn = sorter<TestObject>(h => [h.field(o => o.name), h.field(o => o.id)]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([2, 5, 3, 1, 4]);
  });

  it('should sort by a numeric field in descending order', () => {
    const sortFn = sorter<TestObject>(h => [h.field(o => o.value, { direction: 'desc' })]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([1, 5, 2, 3, 4]);
  });

  it('should perform multi-level sorting', () => {
    // Sort by name (asc), then by value (desc)
    const sortFn = sorter<TestObject>(h => [
      h.field(o => o.name),
      h.field(o => o.value, { direction: 'desc' }),
    ]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([5, 2, 3, 1, 4]);
  });

  it('should handle nulls with "nulls: first"', () => {
    const sortFn = sorter<TestObject>(h => [
      h.field(o => o.category, { nulls: 'first' }),
      h.field(o => o.id),
    ]);
    const sortedIds = getSortedIds(testData, sortFn);
    // The object with id 4 has a null category and should come first.
    expect(sortedIds[0]).toBe(4);
  });

  it('should handle vb == null with "nulls: first"', () => {
    const sortFn = sorter<TestObject>(h => [h.field(o => o.category, { nulls: 'first' })]);
    const data: TestObject[] = [
      { id: 2, name: 'B', value: 2, category: null },
      { id: 1, name: 'A', value: 1, category: 'A' },
    ];
    const sortedIds = getSortedIds(data, sortFn);
    expect(sortedIds).toEqual([2, 1]);
  });

  it('should handle nulls with "nulls: last" (default)', () => {
    const sortFn = sorter<TestObject>(h => [h.field(o => o.category), h.field(o => o.id)]);
    const sortedIds = getSortedIds(testData, sortFn);
    // The object with id 4 has a null category and should come last.
    expect(sortedIds[sortedIds.length - 1]).toBe(4);
  });

  it('should handle sorting with two null values', () => {
    const dataWithTwoNulls: TestObject[] = [...testData, { id: 6, name: 'Delta', value: 5, category: null }];
    const sortFn = sorter<TestObject>(h => [
      h.field(o => o.category, { nulls: 'first' }),
      h.field(o => o.id),
    ]);
    const sortedIds = getSortedIds(dataWithTwoNulls, sortFn);
    // Both nulls should come first, sorted by their id.
    expect(sortedIds.slice(0, 2)).toEqual([4, 6]);
  });

  it('should use a custom compare function and be stabilized by a secondary sort', () => {
    // Sort by the length of the name string, then by id for stability
    const customCompare = (a: string, b: string) => a.length - b.length;
    const sortFn = sorter<TestObject>(h => [h.field(o => o.name, customCompare), h.field(o => o.id)]);
    const sortedIds = getSortedIds(testData, sortFn);
    // Length 5: Alpha(2), Bravo(3), Alpha(5) -> sorted by id -> 2, 3, 5
    // Length 7: Charlie(1), Charlie(4) -> sorted by id -> 1, 4
    expect(sortedIds).toEqual([2, 3, 5, 1, 4]);
  });

  it('should reverse a sort function', () => {
    const sortFn = sorter<TestObject>(h => [h.reverse(h.field(o => o.value))]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([1, 5, 2, 3, 4]); // Same as { direction: 'desc' }
  });

  it('should allow disabling the reversal of a sort function', () => {
    const sortFn = sorter<TestObject>(h => [
      h.reverse(
        h.field(o => o.value),
        true
      ),
    ]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([4, 2, 3, 1, 5]); // Same as ascending
  });

  it('should ignore undefined sorter functions in the creator array', () => {
    const sortFn = sorter<TestObject>(h => [undefined, h.field(o => o.id)]);
    const sortedIds = getSortedIds(testData, sortFn);
    expect(sortedIds).toEqual([1, 2, 3, 4, 5]);
  });

  describe('error handling', () => {
    const sortFn = sorter<unknown>(h => [h.field(o => (o as Record<string, unknown>).value)]);
    const objStr = { value: 'a' };
    const objNum = { value: 1 };
    const objUnsupported = { value: {} };

    it('should throw an error when comparing a string with a non-string', () => {
      // Here, the first argument `a` has a string value, so `va` is a string.
      expect(() => sortFn(objStr, objNum)).toThrow("can't compare string with non-string");
    });

    it('should throw an error when comparing a number with a non-number', () => {
      // Here, the first argument `a` has a number value, so `va` is a number.
      expect(() => sortFn(objNum, objStr)).toThrow("can't compare non-number with non-number");
    });

    it('should throw an error for unsupported types', () => {
      expect(() => sortFn(objUnsupported, objUnsupported)).toThrow(
        'unsupported type object for sorting, use string or number instead'
      );
    });
  });
});
