import { ClassConstructor } from './types';

export const tagChecker = <T extends object, Type extends string>(o: T, type: Type): T =>
  Object.assign(o, { type });

const cachedTypeSymbol = Symbol(`gettrTag:cachedTypeSymbol`);

export const tagCheckerGetter = <T extends object, Type extends string>(
  o: T & { [cachedTypeSymbol]?: string },
  type: () => Type,
  cache = true
): T => {
  Object.defineProperty(o, `type`, {
    get: cache ? () => (o[cachedTypeSymbol] ??= type()) : type,
    set: undefined,
    enumerable: true,
    configurable: true,
  });
  return o as T & { type: Type };
};

export const checkerType = <T extends object>(o: T & { type?: string }) => o.type ?? `[unknown]`;

/**
 * A type definition for a utility function that determines whether a given value
 * matches a specific type T. The `Checker` type is both a function and an object.
 *
 * The function aspect takes an input of any type (`unknown`) and returns a boolean
 * indicating whether the input is of type T.
 *
 * The object aspect includes an optional `type` property, which can be a string
 * representing the name or identifier of the type being checked.
 *
 * @template T The type that the checker function validates against.
 */
export type Checker<T> = ((o: unknown) => o is T) & { type?: string };

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
 * A type guard function to check if the given input is of type string.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a string, otherwise false.
 */
export const isString = tagChecker((o: unknown): o is string => typeof o === 'string', `string`);

/**
 * Checks if the provided value is of type number.
 *
 * This function determines whether the given input is a JavaScript number.
 * It performs a strict type check and returns true if the input is a number,
 * otherwise it returns false.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} - True if the input is a number, otherwise false.
 */
export const isNumber = tagChecker((o: unknown): o is number => typeof o === 'number', `number`);

/**
 * Determines whether the provided value is an integer.
 *
 * This function checks if the input is a number and verifies
 * that it has no fractional component by comparing the value
 * to its truncated version.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the value is a number and an integer, false otherwise.
 */
export const isInteger = tagChecker(
  (o: unknown): o is number => isNumber(o) && Math.trunc(o) === o,
  `integer`
);

/**
 * Checks if a given value is a plain object.
 *
 * A value is considered a plain object if it is not null, has an object type,
 * and its prototype is exactly the default `Object.prototype`.
 *
 * @template T - The type of the input value.
 * @template R - The inferred type of the value's properties.
 * @param {T} o - The value to check.
 * @returns {o is T & Record<string, R>} `true` if the value is a plain object, otherwise `false`.
 */
export const isPlainObject = tagChecker(
  <T, R>(o: T): o is T & Record<string, R> => !!o && Object.getPrototypeOf(o) === Object.prototype,
  `plain-object`
);

/**
 * Checks if the provided value is an object and not null, while also ensuring
 * it is not an array. This function performs a type guard that verifies the
 * value is an object with string keys and values of a specific type.
 *
 * @template T - The original type of the input value.
 * @template R - The type of the object property values.
 * @param {T} o - The value to check.
 * @returns {o is T & Record<string, R>} - Returns true if the value is an object
 * and meets the specified constraints, otherwise false.
 */
export const isSomeObject = tagChecker(
  <T, R>(o: T): o is T & Record<string, R> => typeof o === 'object' && o != null && !Array.isArray(o),
  `some-object`
);

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

/**
 * A utility function that checks if a given value is an array
 * whose elements satisfy a specific type guard function.
 *
 * @template K The type of elements in the array.
 * @param {(o: unknown) => o is K} isK A type guard function to validate individual elements of the array.
 * @returns {(o: unknown) => o is K[]} A function that takes in a value and
 * determines if it is an array of elements satisfying the `isK` type guard.
 */
export const isArrayOf = <K>(isK: Checker<K>): Checker<K[]> =>
  tagCheckerGetter(
    (o): o is K[] => {
      if (!Array.isArray(o)) {
        return false;
      }
      for (const e of o) {
        if (!isK(e)) {
          return false;
        }
      }
      return true;
    },
    () => `${checkerType(isK)}[]`
  );

/**
 * A utility function to check if a given object is an instance of one or more specified classes.
 *
 * @template C The type representing the class or classes to check against.
 * @param {...{new (...args: any[]): C}[]} classes - A list of class constructors to check the object instance against.
 * @returns {(o: unknown) => o is C} A type guard function that takes an object and determines if it is an instance of any of the provided classes.
 */
export const isInstanceOf = <C>(...classes: ClassConstructor<C>[]): Checker<C> =>
  tagCheckerGetter(
    (o): o is C => {
      for (const c of classes) {
        if (o instanceof c) {
          return true;
        }
      }
      return false;
    },
    () => `[${classes.map(c => [`class`, c.name].filter(isTruthy).join(` `)).join(` | `)}]`
  );

/**
 * A utility type that represents a collection of type-checking functions.
 * Each function in the collection determines whether a given value matches
 * its associated type in the input tuple provided as a generic parameter.
 *
 * @template Vs - A tuple of types that define the type-checking functions.
 * Each function in the resulting object corresponds to a type in the tuple,
 * verifying if a value conforms to that specific type.
 */
export type Checkers<Vs extends readonly unknown[]> = { [K in keyof Vs]: (o: unknown) => o is Vs[K] };

/**
 * A utility function that checks whether a given value satisfies at least one of the provided type-checking functions.
 *
 * @param {...Checkers<Vs>} checkers - A rest parameter consisting of an array of type-checking functions.
 * Each function should take a value of an unknown type and validate if it matches a specific type or condition.
 * @returns {(o: unknown) => boolean} A function that takes an unknown value and returns `true` if the value satisfies
 * at least one of the provided type-checking functions, or `false` otherwise.
 */
export const isSomeOf = <Vs extends readonly unknown[]>(...checkers: Checkers<Vs>): Checker<Vs[number]> =>
  tagCheckerGetter(
    (o): o is Vs[number] => {
      for (const e of checkers) {
        if (e(o)) {
          return true;
        }
      }
      return false;
    },
    () => `(${checkers.map(c => checkerType(c)).join(` | `)})`
  );

/**
 * A utility function used to determine whether a given value is a tuple of a specific structure.
 *
 * This function accepts an array of type checkers and validates if the provided value is a tuple
 * matching the specified type structure. Each element in the tuple is validated against its corresponding type checker.
 *
 * @param {...Checkers<Vs>} items - An array of type-checking functions, one for each element in the tuple.
 * @returns {(o: unknown) => o is Vs} - A function that takes a value `o` and checks if it matches the tuple defined by the specified type checkers.
 */
export const isTuple =
  <Vs extends readonly unknown[]>(...items: Checkers<Vs>): Checker<Vs> =>
  (o): o is Vs => {
    if (!Array.isArray(o) || o.length !== items.length) {
      return false;
    }
    for (const [i, element] of items.entries()) {
      if (!element(o[i])) {
        return false;
      }
    }

    return true;
  };

/**
 * Determines if a given array adheres strictly to a tuple structure based on provided type checkers.
 *
 * The function checks if the input array matches the expected type structure as defined
 * by an array of type checkers. Each element of the array must conform to the corresponding
 * type checker in the same position.
 *
 * @param {...Checkers<Vs>} items - A list of type checkers corresponding to each element of the expected tuple.
 * @returns {boolean} Returns `true` if the array matches the tuple structure, otherwise `false`.
 */
export const isTuples = <Vs extends readonly unknown[]>(...items: Checkers<Vs>): Checker<Vs[]> =>
  isArrayOf(isTuple<Vs>(...items));

/**
 * A higher-order function that validates an input against a specified checker function
 * and applies a transformation function if the validation is successful.
 *
 * @template K - The type to validate the input against.
 * @template R - The return type of the transformation function.
 * @param {Checker<K>} isK - A function used to verify if the input matches the specified type or criteria. The `isK.type` property is used to describe the type in error messages.
 * @returns {(o: unknown, fn: (o: K) => R) => R} A function that takes an input value to validate and a transformation function to apply if the input is valid.
 *
 * @throws {Error} Throws an error if the input validation fails, including the expected type (if available) and the actual input value.
 */
export const validator =
  <K>(isK: Checker<K>): (<R>(o: unknown, fn: (o: K) => R) => R) =>
  <R>(o: unknown, fn: (o: K) => R) => {
    if (!isK(o)) {
      throw new Error(`check ${isK.type == null ? '' : `of type ${isK.type} `}failed, got ${o}`);
    }
    return fn(o);
  };

/**
 * A higher-order function that creates a validator for performing runtime type checks on an input.
 * The validator applies the provided type checker and throws an error if the type check fails.
 *
 * @template K The type to be checked.
 * @param {Checker<K>} isK A type checker function that determines whether the input matches the expected type.
 * @returns {(o: unknown) => K} A validation function that validates the input and either returns the validated value or throws an error.
 * @throws {Error} If the input does not pass the provided type check.
 */
export const validator0 =
  <K>(isK: Checker<K>): ((o: unknown) => K) =>
  o => {
    if (!isK(o)) {
      throw new Error(`check ${isK.type == null ? '' : `of type ${isK.type} `}failed, got ${o}`);
    }
    return o;
  };

export function checked<T, R extends T>(v: T, check: (v: T) => v is R, message: (v: T) => string | Error): R;
export function checked<T>(v: T, check: (v: T) => unknown, message: (v: T) => string | Error): T;
/**
 * Evaluates a value against a given check function and throws an error if the check fails.
 *
 * @param {T} v - The value to be validated.
 * @param {(v: T) => unknown} check - A function that performs a validation check on the value. Should return a truthy value if validation passes.
 * @param {(v: T) => string | Error} message - A function that generates an error message or error object to be thrown if validation fails.
 * @return {R} Returns the validated value if the check is successful.
 * @throws {Error} Throws an error if the check function returns a falsy value.
 */
export function checked<T, R extends T>(
  v: T,
  check: (v: T) => unknown,
  message: (v: T) => string | Error
): R {
  if (!check(v)) {
    const e = message(v);
    throw typeof e === `string` ? new Error(e) : e;
  }
  return v as R;
}
