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
 * Helper to build the string description (Label) only once at creation time.
 */
export const buildDesc = (base: string, constraints: (string | number | undefined | null | false)[] = []) => {
  const c = constraints.filter((x): x is string | number => x !== undefined && x !== null && x !== false);
  return c.length === 0 ? base : `${base}(${c.join(', ')})`;
};

export type CheckOptions<T> = {
  /** A custom validation function. Returns true if valid. */
  check?: (value: T) => boolean;
  /** A name for the custom validation (used in the type label). */
  checkName?: string;
};

// Internal helper: ensures value is not null/undefined/primitive
// allowing safe access to properties like .then, .next, etc.
export const canHaveProperties = (value: unknown): value is Record<PropertyKey, unknown> =>
  !!value && (typeof value === 'object' || typeof value === 'function');
