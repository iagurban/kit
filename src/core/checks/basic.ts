import { tagChecker } from './util';

/**
 * Checks if a given value is neither `undefined` nor `null`.
 *
 * @template T
 * @param {T | undefined | null} o - The value to check.
 * @returns {o is T} Returns `true` if the value is defined (not `undefined` or `null`), otherwise `false`.
 */
export const isDefined = tagChecker(<T>(o: T | undefined | null): o is T => o != null, `[defined]`);

/**
 * A type guard function that checks whether a given value is not `undefined`.
 *
 * This function takes in a variable of type `T | undefined` and returns a boolean value indicating
 * whether the variable is of type `T`.
 *
 * @typeParam T - The type of the input value being evaluated.
 * @param o - The value to be checked.
 * @returns A boolean value indicating whether the value is not `undefined`.
 */
export const isNotUndefined = tagChecker(<T>(o: T | undefined): o is T => o !== undefined, `!undefined`);

/**
 * A type guard function that determines if a given value is not null.
 *
 * @template T The type of the input value.
 * @param {T | null} o The value to be checked.
 * @returns {o is T} Returns true if the value is not null; otherwise, returns false.
 */
export const isNotNull = tagChecker(<T>(o: T | null): o is T => o !== null, `!null`);

/**
 * Determines whether a value is truthy, filtering out falsy values such as
 * `undefined`, `null`, `false`, `0`, and empty strings (`''`).
 *
 * This is a TypeScript type guard function that narrows the type of the given
 * value to exclude falsy values.
 *
 * @template T The original type of the input value.
 * @param {T | undefined | null | false | 0 | ''} o The value to be evaluated.
 * @returns {o is T} Returns `true` if the value is truthy, otherwise `false`.
 */
export const isTruthy = tagChecker(<T>(o: T | undefined | null | false | 0 | ''): o is T => !!o, `[truthy]`);

/**
 * A type guard function to determine if a given value is undefined.
 *
 * This function checks if the provided value is strictly equal to `undefined`.
 * It can be used to refine the type of a variable to `undefined` in TypeScript.
 *
 * @param {unknown} o - The value to check.
 * @returns {o is undefined} True if the value is `undefined`, otherwise false.
 */
export const isUndefined = tagChecker((o: unknown): o is undefined => o === undefined, `undefined`);

/**
 * Checks if the given value is strictly null.
 *
 * This function is a type predicate that determines whether the input value
 * is of type `null`. It returns `true` only if the provided value is strictly
 * equal to `null`; otherwise, it returns `false`.
 *
 * @param o - The value to check.
 * @returns A boolean indicating whether the input value is null.
 */
export const isNull = tagChecker((o: unknown): o is null => o === null, `null`);

/**
 * Determines whether the given value is null or undefined.
 *
 * This utility function checks if a value is either strictly `null` or `undefined`
 * and returns a boolean result. It utilizes loose equality to handle both cases.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} - `true` if the value is null or undefined, otherwise `false`.
 */
export const isNullish = tagChecker((o: unknown): o is null | undefined => o == null, `(null|undefined)`);

/**
 * Checks if the provided value is a symbol.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a symbol, otherwise false.
 */
export const isSymbol = tagChecker((o: unknown): o is symbol => typeof o === 'symbol', `symbol`);

/**
 * Checks if the provided value is an Error object.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is an Error object, otherwise false.
 */
export const isError = tagChecker((o: unknown): o is Error => o instanceof Error, `error`);

/**
 * Checks if the provided value is a RegExp object.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a RegExp object, otherwise false.
 */
export const isRegExp = tagChecker((o: unknown): o is RegExp => o instanceof RegExp, `regexp`);

/**
 * Checks if the provided value is a Map.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a Map, otherwise false.
 */
export const isMap = tagChecker(<K, V>(o: unknown): o is Map<K, V> => o instanceof Map, `map`);

/**
 * Checks if the provided value is a Set.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a Set, otherwise false.
 */
export const isSet = tagChecker(<T>(o: unknown): o is Set<T> => o instanceof Set, `set`);

/**
 * Determines if the provided value is a read-only array.
 *
 * @template A
 * @param {unknown | A[] | readonly A[]} a - The value to be checked.
 * @returns {a is readonly A[]} True if the value is a read-only array; otherwise, false.
 */
export const isROArray = tagChecker(
  <A>(a: unknown | A[] | readonly A[]): a is readonly A[] => Array.isArray(a),
  `readonly-array`
);
