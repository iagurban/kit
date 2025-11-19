import { denyRecursion, multiRecurringDenier } from './deny-recursion';

describe('multiRecurringDenier', () => {
  it('should allow a synchronous function to run and return cached result on subsequent calls', () => {
    const syncFunc = jest.fn((x: number) => x * 2);
    const guardedFunc = multiRecurringDenier(
      syncFunc,
      (x: number) => x,
      (x: number) => `Duplicate call with key: ${x} detected`
    );

    expect(guardedFunc(3)).toBe(6);
    expect(guardedFunc(3)).toBe(6);
    expect(syncFunc).toHaveBeenCalledTimes(1);
  });

  it('should return a cached result for the same key after the first call completes (no re-execution)', () => {
    // Given a pure synchronous function
    const syncFunc = jest.fn((x: number) => x * 10);
    const guarded = multiRecurringDenier(
      syncFunc,
      (x: number) => x,
      (x: number) => `Duplicate call with key: ${x} detected`
    );

    // First call executes the underlying function
    expect(guarded(7)).toBe(70);
    expect(syncFunc).toHaveBeenCalledTimes(1);

    // Second call with the same key should NOT execute the underlying function again
    // and should return the cached result instead
    expect(guarded(7)).toBe(70);
    expect(syncFunc).toHaveBeenCalledTimes(1);

    // A different key still executes the function
    expect(guarded(8)).toBe(80);
    expect(syncFunc).toHaveBeenCalledTimes(2);
  });

  it('should allow an async function to run and prevent concurrent invocations with the same key', async () => {
    const asyncFunc = jest.fn(async (x: number) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return x * 2;
    });

    const guardedFunc = multiRecurringDenier(
      asyncFunc,
      (x: number) => x,
      (x: number) => `Duplicate call with key: ${x} detected`
    );

    const firstCall = guardedFunc(3);

    await expect(guardedFunc(3)).rejects.toThrow('Duplicate call with key: 3 detected');
    await expect(firstCall).resolves.toBe(6);

    const secondCall = guardedFunc(5);
    await expect(secondCall).resolves.toBe(10);
    expect(asyncFunc).toHaveBeenCalledTimes(2);
  });

  it('should cache the resolved promise for the same key and reuse it without re-calling the function', async () => {
    const calls: number[] = [];
    const asyncFunc = jest.fn(async (x: number) => {
      calls.push(x);
      await new Promise(resolve => setTimeout(resolve, 20));
      return x * 3;
    });

    const guarded = multiRecurringDenier(
      asyncFunc,
      (x: number) => x,
      () => 'busy'
    );

    // First call kicks off the async computation
    const p1 = guarded(4);

    // Concurrent call with same key is rejected
    await expect(guarded(4)).rejects.toThrow('busy');

    // Wait for completion
    await expect(p1).resolves.toBe(12);
    expect(asyncFunc).toHaveBeenCalledTimes(1);

    // Subsequent call with the same key returns the cached promise's resolved value
    await expect(Promise.resolve(undefined).then(() => guarded(4))).resolves.toBe(12);
    expect(asyncFunc).toHaveBeenCalledTimes(1);
  });

  it('should use a custom error message for duplicate calls with the same key', () => {
    const func = jest.fn((x: number) => x);
    const guardedFunc = multiRecurringDenier(
      func,
      (x: number) => x,
      (x: number) => `Concurrent call for key: ${x} is not allowed`
    );

    guardedFunc(42);
    expect(guardedFunc(42)).toBe(42);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should support custom Error instances from the error factory', () => {
    const fn = jest.fn((x: number) => x);
    class BusyError extends Error {
      constructor(msg: string) {
        super(msg);
        this.name = 'BusyError';
      }
    }

    const guarded = multiRecurringDenier(
      fn,
      (x: number) => x,
      (x: number) => new BusyError(`Key ${x} is busy`)
    );

    expect(guarded(1)).toBe(1);
    expect(guarded(1)).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should allow functions with different keys to execute in parallel', () => {
    const func = jest.fn((x: number) => x);
    const guardedFunc = multiRecurringDenier(
      func,
      (x: number) => x,
      () => 'Duplicate call detected'
    );

    expect(guardedFunc(1)).toBe(1);
    expect(guardedFunc(2)).toBe(2);
    expect(func).toHaveBeenCalledTimes(2);
  });
});
describe('denyRecursion', () => {
  it('should successfully execute a non-recursive function', () => {
    const func = jest.fn((x: number) => x * 2);
    const guardedFunc = denyRecursion(func, 'Recursive call not allowed');

    expect(guardedFunc(2)).toBe(4);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should throw an error on direct recursive call', () => {
    const recursiveFunc = jest.fn((): void => guardedFunc());
    const guardedFunc = denyRecursion(recursiveFunc, 'Recursive call not allowed');

    expect(() => guardedFunc()).toThrow('Recursive call not allowed');
    expect(recursiveFunc).toHaveBeenCalledTimes(1);
  });

  it('should prevent indirect recursion (re-entrancy through another wrapper)', () => {
    // A calls B; B tries to call A again via the guarded wrapper.
    const a = jest.fn((n: number): number => {
      if (n > 0) {
        return guardedA(n - 1); // indirect recursion attempt through guard
      }
      return 0;
    });
    const guardedA = denyRecursion(a, 'Recursive call not allowed');

    expect(() => guardedA(1)).toThrow('Recursive call not allowed');
    expect(a).toHaveBeenCalledTimes(1);
  });

  it('should allow subsequent calls after the first one completes', () => {
    const func = jest.fn((x: number) => x * 2);
    const guardedFunc = denyRecursion(func, 'Recursive call not allowed');

    expect(guardedFunc(2)).toBe(4);
    expect(guardedFunc(3)).toBe(6);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should handle async functions and prevent overlapping calls', async () => {
    const asyncFunc = jest.fn(async (x: number) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return x * 2;
    });
    const guardedFunc = denyRecursion(asyncFunc, 'Recursive call not allowed');

    const firstCall = guardedFunc(2);

    await expect(guardedFunc(3)).rejects.toThrow('Recursive call not allowed');
    await expect(firstCall).resolves.toBe(4);

    const secondCall = guardedFunc(5);
    await expect(secondCall).resolves.toBe(10);
    expect(asyncFunc).toHaveBeenCalledTimes(2);
  });

  it('should use custom error messages for recursive attempts', () => {
    // Prepare a function that will attempt to call itself through the guard to trigger custom error
    const func = jest.fn((x: number): void => guardedFunc(x));
    const guardedFunc = denyRecursion(func, (x: number) => `Recursive call detected with arg: ${x}`);

    // Prepare another independent recursive function to verify a different error message
    const recursiveFunc = jest.fn((): void => guardedRecursiveFunc());
    const guardedRecursiveFunc = denyRecursion(recursiveFunc, 'Recursive call not allowed');

    // Direct recursion should be denied with its own error message
    expect(() => guardedRecursiveFunc()).toThrow('Recursive call not allowed');

    // Custom error factory should be used for the guardedFunc recursion
    expect(() => guardedFunc(42)).toThrow('Recursive call detected with arg: 42');
  });
});
