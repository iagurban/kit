import { CompareResult, sorter } from './sorter';

describe('Sorter', () => {
  test('123', () => {
    const arr = [
      { id: 0, q: 1, a: 0, b: 2, c: 2, d: null },
      { id: 1, q: 0, a: 1, b: 1, c: 0, d: 0 },
      { id: 2, q: 1, a: 2, b: 0, c: 1, d: 1 },
    ];

    const test = (...sorters: readonly ((a: (typeof arr)[0], b: (typeof arr)[0]) => CompareResult)[]) =>
      arr.sort(sorter(...sorters)).map(o => o.id);

    expect(
      test(
        sorter.reverse(
          sorter.field(o => o.q),
          false
        ),
        sorter.field(o => o.b)
      )
    ).toEqual([2, 0, 1]);
    expect(
      test(
        sorter.reverse(
          sorter.field(o => o.q),
          true
        ),
        sorter.field(o => o.b)
      )
    ).toEqual([1, 2, 0]);

    expect(
      test(
        sorter.field(o => o.d, { direction: 'asc', nulls: `first` }),
        sorter.field(o => o.id)
      )
    ).toEqual([0, 1, 2]);

    expect(
      test(
        sorter.field(o => o.d, { direction: 'desc', nulls: `last` }),
        sorter.field(o => o.id)
      )
    ).toEqual([2, 1, 0]);
  });
});
