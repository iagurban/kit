export const skipCalls = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  n: number
): ((...args: Args) => void) => {
  if (!(n >= 0)) {
    throw new Error(`n = ${n} (>=0 allowed only)`);
  }
  if (Math.floor(n) !== n) {
    throw new Error(`n = ${n} (integer allowed only)`);
  }
  let count = 0;
  return (...args: Args) => (count < n ? void ++count : fn(...args));
};
