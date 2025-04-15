export type NumericAgg = (i: readonly number[]) => number;

export const aggregation = (<T extends Record<string, NumericAgg>>(o: T) => o)({
  avg: nn => {
    if (!nn.length) {
      return 0;
    }
    const { length } = nn;
    let agg = 0;
    for (const n of nn) {
      agg += n / length;
    }
    return agg;
  },

  med: nn => {
    if (nn.length < 1) {
      return 0;
    }
    if (nn.length < 2) {
      return nn[0];
    }
    nn = [...nn].sort();
    const pos = nn.length / 2;
    const low = Math.trunc(pos);
    if (low === pos) {
      return nn[low];
    }
    const hi = low + 1;
    return (nn[low] + nn[hi]) / 2;
  },

  mul: nn => {
    if (!nn.length) {
      return 0;
    }
    let agg = 1;
    for (const n of nn) {
      agg *= n;
    }
    return agg;
  },
});

/// TODO move to 'aggregation.'
export const sum = (array: readonly number[]): number => array.reduce((sum, v) => sum + v, 0);
