import { once } from './once';

describe('once function', () => {
  it('should set property value directly when called with true as the third argument', () => {
    const obj: { foo?: number } = {};
    const result = once(obj, 'foo', true, 42);
    expect(obj.foo).toBe(42);
    expect(result).toBe(42);
  });

  it('should throw an error if called on a non-getter descriptor', () => {
    expect(() => {
      once({ foo: 123 }, 'foo', {
        set() {},
        get() {},
      });
    }).toThrow('decorator must be called on getters only');
  });

  it('should memoize the result of a getter upon first access when used as a decorator', () => {
    let computationCount = 0;

    class Example {
      @once
      get value() {
        computationCount++;
        return 100;
      }
    }

    const instance = new Example();
    expect(instance.value).toBe(100);
    expect(instance.value).toBe(100);
    expect(computationCount).toBe(1); // Ensures the computation only happened once
  });

  it('should define the property as enumerable, configurable, and non-writable in decorator mode', () => {
    class Example {
      @once
      get value() {
        return 42;
      }
    }

    const instance = new Example();
    expect(Object.getOwnPropertyDescriptor(instance, 'value')).toEqual(undefined);
    expect(instance.value).toEqual(42);
    const descriptor = Object.getOwnPropertyDescriptor(instance, 'value');
    expect(descriptor?.enumerable).toBe(true);
    expect(descriptor?.configurable).toBe(true);
    expect(descriptor?.writable).toBe(false);
  });
});
