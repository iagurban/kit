/**
 * Defines a value property on the given target with stable attributes and returns the value.
 *
 * The property is defined with the following descriptors:
 * - `writable: false` — the value cannot be reassigned
 * - `enumerable: true` — the property appears during enumeration
 * - `configurable: true` — the property can be reconfigured or deleted later
 *
 * This helper is primarily used by {@link once} to replace a getter with its computed value
 * after the first access (lazy initialization / memoization).
 *
 * @typeParam T - Type of the value being assigned.
 * @typeParam O - Type of the target object.
 * @typeParam K - Key of the property on the target object.
 * @param target - The object on which to define the property.
 * @param key - The property name to define on the target.
 * @param value - The value to set for the property.
 * @returns The same `value` that was provided.
 */
export const setValueProperty = <T, K extends keyof O, O>(target: O, key: K, value: T): T => {
  Object.defineProperty(target, key, {
    value,
    writable: false,
    enumerable: true,
    configurable: true,
  });
  return value;
};

/**
 * Memoizes a getter: replaces it with its computed value upon first access.
 *
 * Decorator usage: apply to a getter to turn it into a lazy property.
 * After the first `get`, the descriptor is replaced with a concrete value using
 * {@link setValueProperty}, so subsequent accesses return the cached value without
 * invoking the original getter again.
 *
 * Example (decorator):
 * ```ts
 * class Example {
 *   @once
 *   get expensive() {
 *     return heavyComputation();
 *   }
 * }
 * ```
 *
 * Notes:
 * - Must be used on getters only; using on a setter or a non-getter throws an error.
 * - The resulting property is non-writable, enumerable, and configurable.
 *
 * @typeParam T - The inferred return type of the getter.
 * @typeParam O - The type of the instance that owns the property.
 * @typeParam K - The key of the property on `O`.
 * @param target - The prototype or instance the decorator is applied to (provided by TS decorator system).
 * @param key - The property name being decorated.
 * @param d - The typed property descriptor provided by the decorator system.
 * @returns A new getter-only descriptor that memoizes its first computed value.
 */
export function once<T, O, K extends keyof O>(
  target: O,
  key: K,
  d: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T>;

/**
 * Sets a property to a concrete value in a form suitable for use inside a getter body.
 *
 * Function usage: when called with `true` as the third argument, it directly defines
 * the value on the instance (using {@link setValueProperty}) and returns it. This is
 * especially handy for manual lazy initialization inside a getter without using a
 * decorator.
 *
 * Example (function form inside getter):
 * ```ts
 * get a() {
 *   return once(this, 'a', true, 123 + 456 + 789);
 * }
 * ```
 *
 * @typeParam T - Type of the value being set.
 * @typeParam O - Type of the target object.
 * @typeParam K - The key of the property on `O`.
 * @param target - The object on which to set the property.
 * @param key - Property name to set.
 * @param replace - Literal `true` to select the function form of `once`.
 * @param value - The value to assign to the property.
 * @returns The value that was assigned to the property.
 */
export function once<T, O, K extends keyof O>(target: O, key: K, replace: true, value: T): T;

export function once<T, K extends keyof O, O>(
  target: O,
  key: K,
  descriptorOrFlag: true | TypedPropertyDescriptor<T>,
  value?: T
): T | TypedPropertyDescriptor<T> {
  if (descriptorOrFlag === true) {
    return setValueProperty(target, key, value!);
  }

  const { get, set } = descriptorOrFlag;
  if (!get || set) {
    throw new Error('decorator must be called on getters only');
  }

  return {
    get() {
      return setValueProperty(this, key as keyof typeof this, get.call(this));
    },
    enumerable: true,
    configurable: true,
  };
}
