/**
 * Creates a new array by interleaving the elements of the input array with the result of a callback function.
 *
 * @template T The type of elements in the input array.
 * @param {T[]} a The input array to be interleaved.
 * @param {(prev: T, i: number) => T} o A callback function invoked for each pair of elements in the array.
 *                                    The function takes the current element and its index as arguments and
 *                                    returns the value to be interleaved.
 * @returns {T[]} A new array where each pair of elements is interleaved with the result of the callback function.
 *                If the input array has fewer than two elements, it is returned unchanged.
 */
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
