export const interleaveWithObject = <T>(a: T[], o: (prev: T, i: number) => T) => {
  if (a.length < 2) {
    return a;
  }
  const r: T[] = [];
  let i = 0;
  for (; i < a.length - 1; ++i) {
    const prev = a[i];
    r.push(prev, o(prev, i));
  }
  r.push(a[i]);
  return r;
};
