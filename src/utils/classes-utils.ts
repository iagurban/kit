const initializedSymbol: unique symbol = Symbol(`SomeStore.initialized`);

const onInit = <T extends { [initializedSymbol]?: boolean }>(t: T) => {
  if (t[initializedSymbol]) {
    throw new Error(`calling init() while already initialized`);
  }
  t[initializedSymbol] = true;
};

const onDestroy = <T extends { [initializedSymbol]?: boolean }>(t: T) => {
  if (t[initializedSymbol] !== true) {
    throw new Error(`calling destroy() while not initialized`);
  }
  t[initializedSymbol] = false;
};

const makePair = (on: typeof onInit) =>
  [
    <T>(target: T, property: string, descriptor: TypedPropertyDescriptor<() => unknown>) => {
      const old = descriptor.value;
      if (typeof old !== `function`) {
        throw new TypeError(`decorator applied to not a method`);
      }
      descriptor.value = function (this: T & { [initializedSymbol]?: boolean }) {
        onInit(this);
        return Function.prototype.call(old, this);
      };
    },
    <T, R>(target: T, fn: () => R) =>
      () => {
        on(target as T & { [initializedSymbol]?: boolean });
        return fn();
      },
  ] as const;

export const [InitMethod, InitFunction] = makePair(onInit);
export const [DestroyMethod, DestroyFunction] = makePair(onDestroy);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isConstructable = <T extends { new (...args: any[]): unknown }>(fn: T | unknown): fn is T => {
  try {
    new new Proxy(fn as T, { construct: () => ({}) })(); // faking constructing it mocking constructor
    return true;
  } catch {
    return false;
  }
};
