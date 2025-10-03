export const catching = <T, V>(fn: () => T, onError: (e: unknown) => V): T | V => {
  try {
    return fn();
  } catch (e) {
    return onError(e);
  }
};

export const catchingAsync = async <T, V>(
  fn: () => Promise<T>,
  onError: (e: unknown) => V | Promise<V>
): Promise<T | V> => {
  try {
    return await fn();
  } catch (e) {
    return onError(e);
  }
};
