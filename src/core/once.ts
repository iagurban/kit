export const overwriteGetter = <T, K extends keyof O, O>(target: O, key: K, value: T): T => {
  Object.defineProperty(target, key, {
    value,
    writable: false,
    enumerable: true,
    configurable: true,
  });
  return value;
};

export function once<T, O, K extends keyof O>(target: O, key: K, d: TypedPropertyDescriptor<T>): void;
export function once<T, O, K extends keyof O>(target: O, key: K, replace: true, value: T): T;

export function once<T, K extends keyof O, O>(
  target: O,
  key: K,
  descriptorOrFlag: true | TypedPropertyDescriptor<T>,
  value?: T
): T | void {
  if (descriptorOrFlag === true) {
    return overwriteGetter(target, key, value);
  }

  const { get, set } = descriptorOrFlag;
  if (!get || set) {
    throw new Error('decorator must be called on getters only');
  }

  Object.defineProperty(target, key, {
    get() {
      return overwriteGetter(this, key, get.call(this));
    },
    enumerable: true,
    configurable: true,
  });
}
