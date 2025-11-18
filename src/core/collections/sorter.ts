import { isDefined } from '../checks';

export type CompareResult = number;
export type CompareFunction<T> = (a: T, b: T) => CompareResult;

export type SorterHelper<T> = {
  field<V>(
    getter: (o: T) => V,
    compareFnOrOptions?: CompareFunction<V> | { direction?: `asc` | `desc`; nulls?: `first` | `last` }
  ): CompareFunction<T>;
  reverse(fn: CompareFunction<T>, disable?: boolean): CompareFunction<T>;
};

export type SorterCreator<T> = (helper: SorterHelper<T>) => readonly (CompareFunction<T> | undefined)[];

/**
 * Usage:
 *
 *     [
 *       { id: 0, q: 1, a: 0, b: 2, c: 2 },
 *       { id: 1, q: 0, a: 1, b: 1, c: 0 },
 *       { id: 2, q: 1, a: 2, b: 0, c: 1 },
 *     ].sort(
 *       sorter(helper => [
 *         helper.reverse(helper.field(o => o.q)),
 *         helper.field(o => o.b, {nulls:`first`}) // nulls first (default is nulls-last-mode)
 *       ])
 *     ); // will sort by (.q -> nulls last -> desc ; .b -> nulls first & asc)
 *
 * Sorters can be nested, everything is going to be CompareFunction as the result.
 */
export const sorter = <T>(creator: SorterCreator<T>): CompareFunction<T> => {
  const helper: SorterHelper<T> = {
    field:
      <V>(
        getter: (o: T) => V,
        compareFnOrOptions?: CompareFunction<V> | { direction?: `asc` | `desc`; nulls?: `first` | `last` }
      ): CompareFunction<T> =>
      (a, b) => {
        const va = getter(a);
        const vb = getter(b);

        if (compareFnOrOptions && typeof compareFnOrOptions === 'function') {
          return compareFnOrOptions(va, vb);
        }

        if (va == null) {
          return vb == null ? 0 : compareFnOrOptions?.nulls === `first` ? -1 : 1;
        }
        if (vb == null) {
          return compareFnOrOptions?.nulls === `first` ? 1 : -1;
        }

        const apply: (n: number) => number = compareFnOrOptions?.direction === `desc` ? v => -v : v => v;

        if (typeof va === 'string') {
          if (typeof vb !== 'string') {
            throw new Error(`can't compare string with non-string`);
          }
          return apply(va.localeCompare(vb));
        }

        if (typeof va === 'number') {
          if (typeof vb !== 'number') {
            throw new Error(`can't compare non-number with non-number`);
          }
          return apply(va - vb);
        }

        throw new Error(`unsupported type ${typeof va} for sorting, use string or number instead`);
      },

    reverse: (fn: CompareFunction<T>, disable?: boolean): CompareFunction<T> =>
      disable ? fn : (a: T, b: T) => -fn(a, b),
  };

  const sorters = creator(helper).filter(isDefined);
  return (a, b) => {
    for (const compare of sorters) {
      const r = compare(a, b);
      if (r !== 0) {
        return r;
      }
    }
    return 0;
  };
};
