/**
 * Creates a weak cache generator function that memoizes the output of a given creation function
 * associated with the input object. The cache automatically ensures that objects are garbage
 * collected once they are no longer referenced elsewhere in the application.
 *
 * @template T The type of the input object. Must be an object or an array of objects.
 * @template E The type of the value created and cached.
 * @param {function(T): E} create A function that generates a value of type `E` based on the input object of type `T`.
 * @returns {function(T): E} A function that takes an object of type `T` as input and returns a cached or newly created value of type `E`.
 */
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
