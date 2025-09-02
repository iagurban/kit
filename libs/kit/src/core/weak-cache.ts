export const weakCache = <T extends Record<never, never> | readonly Record<never, never>[], E>(
  create: (o: T) => E
): ((o: T) => E) => {
  const m = new WeakMap<T, E>();
  return o => {
    let v = m.get(o);
    if (!v) {
      v = create(o);
      m.set(o, v);
    }
    return v;
  };
};
