import { sorter, SorterCreator } from './sorter';

describe('Sorter', () => {
  test('123', () => {
    const arr = [
      { id: 0, q: 1, a: 0, b: 2, c: 2, d: null },
      { id: 1, q: 0, a: 1, b: 1, c: 0, d: 0 },
      { id: 2, q: 1, a: 2, b: 0, c: 1, d: 1 },
    ];

    const test = (creator: SorterCreator<(typeof arr)[0]>) => arr.sort(sorter(creator)).map(o => o.id);

    expect(
      test(h => [
        h.reverse(
          h.field(o => o.q),
          false
        ),
        h.field(o => o.b),
      ])
    ).toEqual([2, 0, 1]);
    expect(
      test(h => [
        h.reverse(
          h.field(o => o.q),
          true
        ),
        h.field(o => o.b),
      ])
    ).toEqual([1, 2, 0]);

    expect(test(h => [h.field(o => o.d, { direction: 'asc', nulls: `first` }), h.field(o => o.id)])).toEqual([
      0, 1, 2,
    ]);

    expect(test(h => [h.field(o => o.d, { direction: 'desc', nulls: `last` }), h.field(o => o.id)])).toEqual([
      2, 1, 0,
    ]);
  });
});
