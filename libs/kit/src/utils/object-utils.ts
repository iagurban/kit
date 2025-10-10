export const mappedBy = <T, K extends string | number | symbol>(o: readonly T[], by: (t: T) => K) => {
  const r: Partial<Record<K, T>> = {};
  for (const t of o) {
    r[by(t)] = t;
  }
  return r as Record<K, T>;
};

export const groupedBy = <T, K extends string | number | symbol>(o: readonly T[], by: (t: T) => K) => {
  const r: Partial<Record<K, T[]>> = {};
  for (const t of o) {
    (r[by(t)] ??= []).push(t);
  }
  return r as Record<K, T[]>;
};

export const mapEntries = <K extends string, V, R extends Record<K, V>, D>(o: R, fn: (v: V, k: K) => D) => {
  const r: Partial<Record<K, D>> = {};
  for (const [k, v] of Object.entries(o)) {
    r[k as K] = fn(v as V, k as K);
  }
  return r as Record<K, D>;
};

export const mapOwnEntries = <R extends Record<string, unknown>, D>(
  o: R,
  fn: (v: R[keyof R], k: keyof R) => D
) => {
  const r: Partial<Record<keyof R, D>> = {};
  for (const [k, v] of Object.entries(o)) {
    if (!Object.prototype.hasOwnProperty.call(o, k)) {
      continue;
    }
    r[k as keyof R] = fn(v as R[keyof R], k as keyof R);
  }
  return r as Record<keyof R, D>;
};

export const fromEntries = <T extends string | number | symbol, V>(
  pairs: readonly (readonly [T, V])[]
): Record<T, V> => Object.fromEntries(pairs) as Record<T, V>;
