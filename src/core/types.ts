/**
 * A utility type that combines two types, T and O, allowing you to override the properties
 * of the first type, T, with the properties from the second type, O.
 *
 * For every property key, the resolved type will:
 * - Use the type from O if the key exists in O.
 * - Otherwise, use the type from T if the key exists in T.
 * - If a key exists in neither, it will resolve to `never`.
 *
 * This type is particularly useful when you need to modify or replace specific properties
 * of an existing type with another set of properties while maintaining compatibility.
 *
 * @template T The original type whose fields can be overridden.
 * @template O The type containing fields and their types to override in the original type.
 */
export type OverrideFields<T, O> = {
  [K in keyof T | keyof O]: K extends keyof O ? O[K] : K extends keyof T ? T[K] : never;
};

/**
 * Represents a type that can either be a single value of type `T` or a readonly array of values of type `T`.
 *
 * This type is useful for scenarios where an input or output can accept or return a singular value or
 * multiple values in the form of an array.
 *
 * @template T - The type of the value or the elements in the array.
 */
export type ValOrArr<T> = T | readonly T[];

/**
 * Represents a type that can be either `null` or `undefined`.
 *
 * This type is useful in cases where a value is explicitly allowed
 * to be missing or not set, and it is necessary to differentiate
 * between other valid types.
 *
 * Commonly used for optional values or to indicate an absence of data.
 */
export type Nullish = null | undefined;

/**
 * A utility type that excludes `null` and `undefined` from a given type `T`.
 *
 * This type alias is helpful when you want to ensure that a value cannot be nullish
 * (i.e., neither null nor undefined) and must be of a concrete value type.
 *
 * @template T - The type from which `null` and `undefined` will be excluded.
 */
export type NotNullish<T> = Exclude<T, Nullish>;

/**
 * A utility type that extracts the required keys of a given type `T`.
 *
 * The `RequiredKeys` type examines each key `K` in the type `T` to determine
 * if the property is required or optional. It includes the key `K` in the resulting
 * type only if the property is required.
 *
 * A key is considered required if the type `{}` is not assignable to `{ [P in K]: T[K] }`.
 *
 * Usage:
 * - Use this type to infer or extract the keys of an object type that are required.
 *
 * This type is particularly useful for working with strongly-typed objects where
 * distinguishing between optional and required properties is necessary.
 *
 * @template T The type for which required keys will be computed.
 * @returns A union type of the required keys of `T`.
 */
export type RequiredKeys<T> = {
  [K in keyof T]: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

/**
 * A utility type that creates a new type by extracting all required (non-optional) properties
 * from the given type `T`. The resulting type includes only the keys of `T` that are not marked
 * as optional.
 *
 * This type is useful for creating stricter types out of existing types by filtering out any
 * properties that allow undefined or are not mandatory.
 *
 * @template T - The source type from which required keys should be extracted.
 */
export type NonOptional<T> = Pick<T, RequiredKeys<T>>;

/**
 * A utility type that extracts the type of elements from an array type.
 * If the provided type is an array type, it returns the type of its elements.
 * Otherwise, it returns the type itself.
 *
 * @template T - The type to be evaluated.
 */
export type UnwrapArray<T> = T extends (infer R)[] ? R : T;

/**
 * A utility type that extracts the values of an object type.
 *
 * The `RecordValues` type allows you to get the union of all the values
 * that can be accessed from the specified object type `T`. This is helpful
 * for scenarios where you need to work with the possible values of an object
 * rather than its keys.
 *
 * @template T - The object type from which the values will be extracted.
 */
export type RecordValues<T> = T[keyof T];

/**
 * A utility generic type to create a mutable version of an array type.
 *
 * This type takes an input type `A`. If `A` is a readonly array type, it creates a mutable version
 * of that array type. If `A` is not a readonly array type, it simply returns the input type `A` itself.
 *
 * @template A - The input type to be transformed. If it's a readonly array, its mutable version will be returned.
 */
export type MutableArray<A> = A extends readonly (infer Q)[] ? Q[] : A;

/**
 * A utility type that generates a new type by picking keys from a given type `T`
 * where the corresponding properties are strictly of the `undefined` type.
 *
 * The resulting type will have the keys set to `true` if their associated values in `T`
 * are strictly `undefined`.
 *
 * @template T The type from which keys with `undefined` values will be picked.
 */
export type PickUndefinedKeys<T> = { [K in keyof T as T[K] extends undefined ? K : never]: true };

type RecurOrderObj<T, Values> = Record<string, Values | T | undefined>;
/**
 * IRecurOrderObj is an extension of the RecurOrderObj interface, which allows
 * for the creation of recursive data structures. This interface is generic and
 * takes a type parameter `Values`, which defines the type of the values
 * contained within the recursive order object.
 *
 * The generic parameter `IRecurOrderObj<Values>` is used to enforce the
 * recursive structure, ensuring that implementations of this interface
 * contain child elements of the same type.
 *
 * @template Values The type of the values managed within the recursive order object.
 * @extends RecurOrderObj<IRecurOrderObj<Values>, Values> Indicates inheritance and reuse
 * of the RecurOrderObj structure for recursive hierarchical data handling.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRecurOrderObj<Values> extends RecurOrderObj<IRecurOrderObj<Values>, Values> {}

/**
 * Represents a type for any function. It can accept any number of arguments of any type and return a value of a specified type.
 *
 * @template R - The type of the return value of the function. Defaults to `unknown` if not specified.
 */
export type AnyFunction<R = unknown> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...a: readonly any[]) => R;

/**
 * A utility type that maps an object type `T` to another object type where all the properties
 * of `T` are preserved exactly as they are, ensuring no additional or removed properties.
 *
 * The `Exact` type is often used to enforce stricter object typing by ensuring that the resulting
 * type matches the keys and values of the provided object `T` explicitly.
 *
 * @template T The input object type to be mapped exactly.
 */
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

/**
 * A type definition for a function that accepts any number of arguments
 * of any type and returns a value of type R.
 *
 * This is a generic type where:
 * - R represents the return type of the function and defaults to any.
 *
 * Note:
 * - This type is intentionally permissive and allows arguments and return values
 *   of any type. Use with caution as it bypasses type safety guarantees.
 */
export type AnyAnyFunction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R = any, // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = (...args: any[]) => R;

/**
 * Represents a constructor type for a class, which can be used to create
 * instances of the class.
 *
 * @template Instance The type of the instance created by the constructor.
 *
 * @typedef {Object} ClassConstructor
 * @property {Function} new - A construct signature that accepts any number of
 * parameters of any type and returns an instance of the specified type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassConstructor<Instance> = { new (...args: any[]): Instance };

/**
 * Represents a type alias for an array of any type.
 * This type can hold an array containing elements of any data type,
 * including mixed types within the same array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyArray = any[];
