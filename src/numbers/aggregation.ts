export type NumericAgg = (i: readonly number[]) => number;

const trimmedMean = (trimPercent: number) => (nn: readonly number[]) => {
  const n = nn.length;
  if (n < 2) {
    return basic.avg(nn);
  }
  const trim = Math.floor((n * trimPercent) / 100);
  const sorted = [...nn].sort((a, b) => a - b).slice(trim, n - trim);
  return basic.avg(sorted);
};

const percentile = (p: number) => (nn: readonly number[]) => {
  if (!nn.length) {
    return 0;
  }
  const sorted = [...nn].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx),
    hi = Math.ceil(idx);
  return lo === hi ? sorted[lo] : sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
};

const basic = {
  // Arithmetic mean: sum of elements divided by count
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
} satisfies Record<string, (nn: readonly number[]) => number>;

const basic2 = {
  // Variance: average squared deviation from the mean
  variance: nn => {
    if (nn.length < 2) {
      return 0;
    }
    const mu = basic.avg(nn);
    return nn.reduce((acc, x) => acc + (x - mu) ** 2, 0) / nn.length;
  },

  // Sum of squares: useful for RMS, etc.
  sumOfSquares: nn => nn.reduce((acc, x) => acc + x * x, 0),
} satisfies Record<string, (nn: readonly number[]) => number>;

export const aggregation = {
  ...({
    ...basic,

    // Median: middle value (or average of two middles)
    med: nn => {
      if (nn.length < 2) {
        return nn.length ? nn[0] : 0;
      }
      const sorted = [...nn].sort((a, b) => a - b);
      const mid = sorted.length / 2;
      const lo = Math.trunc(mid);
      return lo === mid ? sorted[lo] : (sorted[lo] + sorted[lo + 1]) / 2;
    },

    // Product of all elements (or 0 if empty)
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

    // Sum of all elements
    sum: nn => {
      if (!nn.length) {
        return 0;
      }
      let agg = 0;
      for (const n of nn) {
        agg += n;
      }
      return agg;
    },

    // Minimum value (or 0 if empty)
    min: nn => (nn.length ? Math.min(...nn) : 0),

    // Maximum value (or 0 if empty)
    max: nn => (nn.length ? Math.max(...nn) : 0),

    ...basic2,

    // Standard deviation: square root of variance
    std: nn => Math.sqrt(basic2.variance(nn)),

    // Geometric mean: nth root of product (all values must be > 0)
    geoMean: nn => {
      if (!nn.length) {
        return 0;
      }
      return Math.exp(nn.reduce((acc, x) => acc + Math.log(x), 0) / nn.length);
    },

    // Harmonic mean: reciprocal of the arithmetic mean of reciprocals
    harmMean: nn => {
      if (!nn.length || nn.some(x => x === 0)) {
        return 0;
      }
      return nn.length / nn.reduce((acc, x) => acc + 1 / x, 0);
    },

    // Mode: most frequently occurring value (first one if multiple)
    mode: nn => {
      if (!nn.length) {
        return 0;
      }
      const freq = new Map<number, number>();
      nn.forEach(x => freq.set(x, (freq.get(x) || 0) + 1));
      let [mode, maxCount] = [nn[0], 0];
      for (const [x, count] of freq) {
        if (count > maxCount) {
          [mode, maxCount] = [x, count];
        }
      }
      return mode;
    },

    // 90th percentile
    p90: percentile(90),

    // Range: difference between max and min (or 0 if empty)
    range: nn => (nn.length ? Math.max(...nn) - Math.min(...nn) : 0),

    // Root mean square: sqrt of average squared value
    rms: nn => (nn.length ? Math.sqrt(basic2.sumOfSquares(nn) / nn.length) : 0),

    // Count: number of elements
    count: nn => nn.length,

    // Unique count: number of distinct values
    uniqueCount: nn => new Set(nn).size,

    // 10% trimmed mean
    trimmed10: trimmedMean(10),
  } satisfies Record<string, (nn: readonly number[]) => number>),

  // Trimmed mean factory: drops trimPercent% smallest and largest
  trimmedMean,

  // Percentile factory: returns the p-th percentile (0–100)
  percentile,
};
