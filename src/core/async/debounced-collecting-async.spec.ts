import { sleep } from '../sleep';
import { debouncedCollectingAsync } from './debounced-collecting-async';

describe('debouncedCollectingAsync', () => {
  it('should debounce multiple calls and execute the async function once with accumulated arguments', async () => {
    const collectMock = jest.fn((acc: string | null, arg: string) => (acc || '') + arg);
    const asyncMock = jest.fn(async (acc: string) => acc.toUpperCase());
    const debounce = debouncedCollectingAsync(100, collectMock, asyncMock);

    const result1 = debounce('a');
    const result2 = debounce('b');
    const result3 = debounce('c');

    await expect(result1).resolves.toBe('ABC');
    await expect(result2).resolves.toBe('ABC');
    await expect(result3).resolves.toBe('ABC');
    expect(asyncMock).toHaveBeenCalledTimes(1);
    expect(asyncMock).toHaveBeenCalledWith('abc');
    expect(collectMock).toHaveBeenCalledTimes(3);
  });

  it('should reset the debounce if called after the delay', async () => {
    jest.useFakeTimers();
    const collectMock = jest.fn((acc: string | null, arg: string) => (acc || '') + arg);
    const asyncMock = jest.fn(async (acc: string) => acc.toUpperCase());
    const debounce = debouncedCollectingAsync(100, collectMock, asyncMock);

    debounce('a');
    jest.advanceTimersByTime(150);
    debounce('b');

    await jest.runOnlyPendingTimersAsync();

    expect(asyncMock).toHaveBeenCalledTimes(2);
    expect(asyncMock).toHaveBeenCalledWith('a');
    expect(asyncMock).toHaveBeenCalledWith('b');
    jest.useRealTimers();
  });

  it('should allow cancellation of pending executions', async () => {
    const collectMock = jest.fn((acc: string | null, arg: string) => (acc || '') + arg);
    const asyncMock = jest.fn(async (acc: string) => acc.toUpperCase());
    const debounce = debouncedCollectingAsync(100, collectMock, asyncMock);

    const result = debounce('a');
    debounce.cancel();

    await expect(result).rejects.toThrow('canceled');
    expect(asyncMock).not.toHaveBeenCalled();
  });

  it('should handle multiple arguments correctly', async () => {
    const collectMock = jest.fn(
      (acc: number | null, ...args: number[]) => (acc ?? 0) + args.reduce((sum, num) => sum + num, 0)
    );
    const asyncMock = jest.fn(async (sum: number) => sum * 2);
    const debounce = debouncedCollectingAsync(100, collectMock, asyncMock);

    const result1 = debounce(1, 2);
    const result2 = debounce(3);

    await expect(result1).resolves.toBe(12);
    await expect(result2).resolves.toBe(12);
    expect(asyncMock).toHaveBeenCalledTimes(1);
    expect(asyncMock).toHaveBeenCalledWith(6);
    expect(collectMock).toHaveBeenCalledTimes(2);
  });

  it('should handle empty calls gracefully', async () => {
    const collectMock = jest.fn((acc: string | null) => acc || '');
    const asyncMock = jest.fn(async (acc: string) => acc.toUpperCase());
    const debounce = debouncedCollectingAsync(100, collectMock, asyncMock);

    const result = debounce();
    await expect(result).resolves.toBe('');
    expect(asyncMock).toHaveBeenCalledWith('');
  });

  describe('coverage', () => {
    it('should log an error if an executing lane promise rejects', async () => {
      const error = new Error('test error');
      let isFirstCall = true;
      let resolveFirstCall: () => void;
      const firstCallPromise = new Promise<void>(resolve => (resolveFirstCall = resolve));

      const debounced = debouncedCollectingAsync(
        50,
        (acc, v) => v,
        async val => {
          if (isFirstCall) {
            isFirstCall = false;
            await firstCallPromise;
            throw error;
          }
          return val;
        }
      );

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const p1 = debounced(1);
      await sleep(60); // Wait for p1 to start executing

      const p2 = debounced(2); // p2 now waits for p1, attaching the console.error handler

      resolveFirstCall!(); // Allow p1 to proceed and reject

      await expect(p1).rejects.toThrow(error);
      await expect(p2).resolves.toBe(2);

      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
      consoleErrorSpy.mockRestore();
    });

    it('should throw from goToExecution if canceled after delay', async () => {
      jest.useFakeTimers();
      const asyncMock = jest.fn(async (v: number) => v);
      const debounced = debouncedCollectingAsync(100, (acc: null | number, v: number) => v, asyncMock);

      const p = debounced(1);

      // Advance the timer synchronously. This queues the promise resolution (and the next step) as a microtask.
      jest.advanceTimersByTime(100);

      // Cancel *before* the microtask queue is processed.
      debounced.cancel();

      // Allow the microtask queue to process. The promise will now try to execute,
      // call goToExecution, and hit the `if (l.canceled)` check.
      await expect(p).rejects.toThrow('canceled');
      expect(asyncMock).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });
});
