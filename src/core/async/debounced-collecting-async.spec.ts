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

    const res1 = debounce('a');
    await jest.advanceTimersByTimeAsync(150);
    const res2 = debounce('b');
    await jest.advanceTimersByTimeAsync(150);

    await expect(res1).resolves.toBe('A');
    await expect(res2).resolves.toBe('B');

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
    debounce.cancel(`canceled`);

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

  it(
    'should queue a new execution if called while another is in flight',
    async () => {
      const events: string[] = [];
      let resolveFirstCall: () => void;
      const firstCallPromise = new Promise<void>(resolve => (resolveFirstCall = resolve));

      const asyncMock = jest.fn(async (acc: string) => {
        events.push(`start:${acc}`);
        if (acc === 'a') {
          await firstCallPromise;
        }
        events.push(`end:${acc}`);
        return acc.toUpperCase();
      });

      const collectMock = jest.fn((acc: string | null, arg: string) => (acc || '') + arg);
      const debounce = debouncedCollectingAsync(50, collectMock, asyncMock);

      // First call
      const result1 = debounce('a');

      // Wait for the first debounce window to close and execution to start
      await sleep(60);

      // Second call, while the first is "executing" (paused by the promise)
      const result2 = debounce('b');
      const result3 = debounce('c');

      // At this point, fn('a') should have started
      expect(events).toEqual(['start:a']);

      // Allow the first execution to complete
      resolveFirstCall!();

      // Wait for all promises to settle
      await expect(result1).resolves.toBe('A');
      // The second batch should start executing only after the first one ends.
      await sleep(60); // wait for the second debounce window
      await expect(result2).resolves.toBe('BC');
      await expect(result3).resolves.toBe('BC');

      // Check execution order
      expect(events).toEqual(['start:a', 'end:a', 'start:bc', 'end:bc']);

      // Check mocks
      expect(asyncMock).toHaveBeenCalledTimes(2);
      expect(asyncMock).toHaveBeenCalledWith('a');
      expect(asyncMock).toHaveBeenCalledWith('bc');
    },
    10000
  );

  it(
    'should handle new pending lane created while old one waits for execution',
    async () => {
      let resolveFirstExecution: () => void;
      const firstExecutionPromise = new Promise<void>(resolve => {
        resolveFirstExecution = resolve;
      });

      let resolveSecondExecution: () => void;
      const secondExecutionPromise = new Promise<void>(resolve => {
        resolveSecondExecution = resolve;
      });

      const asyncMock = jest.fn(async (acc: string) => {
        if (acc === 'first') {
          await firstExecutionPromise;
          return 'FIRST';
        }
        if (acc === 'a') {
          await secondExecutionPromise;
          return 'A';
        }
        return acc.toUpperCase();
      });

      const collectMock = jest.fn((acc: string | null, arg: string) => (acc || '') + arg);
      const debounce = debouncedCollectingAsync(50, collectMock, asyncMock);

      // 1. Start a long-running execution to block the queue.
      const p0 = debounce('first');
      await sleep(60); // Ensure 'first' starts executing and is blocked on its promise.

      // 2. Make the first debounced call ('a'). This will create lane1.
      //    It will be queued, waiting for the 'first' execution to finish.
      const p1 = debounce('a');

      // 3. Wait for lane1's own delay to pass, marking it as 'ready'.
      await sleep(60);

      // 4. Make a second debounced call ('b'). Since lane1 is ready, this creates a new lane (lane2).
      //    `lanes.pendingLane` is now lane2.
      const p2 = debounce('b');

      // 5. Allow the very first execution to finish. This unblocks lane1.
      //    `executeLane(lane1)` is called, but `lanes.pendingLane` is `lane2`, so the 'else' branch is taken.
      resolveFirstExecution!();

      // 6. Allow lane1's execution to finish.
      resolveSecondExecution!();

      // 7. Await all results.
      await expect(p0).resolves.toBe('FIRST');
      await expect(p1).resolves.toBe('A');
      await expect(p2).resolves.toBe('B');

      expect(asyncMock).toHaveBeenCalledTimes(3);
    },
    10000
  );

  describe('coverage', () => {
    it(
      'should log an error if an executing lane promise rejects',
      async () => {
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
      },
      10000
    );

    it('should throw from goToExecution if canceled after delay', async () => {
      jest.useFakeTimers();
      const asyncMock = jest.fn(async (v: number) => v);
      const debounced = debouncedCollectingAsync(100, (acc: null | number, v: number) => v, asyncMock);

      const p = debounced(1);

      // Advance the timer, but don't wait for the promise to resolve yet.
      const advancePromise = jest.advanceTimersByTimeAsync(100);

      // Cancel *before* the timer advancement is fully processed.
      debounced.cancel(`canceled`);

      // Now, await the timer and the subsequent rejection.
      await expect(p).rejects.toThrow('canceled');
      await advancePromise; // Ensure the timer is fully processed.

      expect(asyncMock).not.toHaveBeenCalled();

      jest.useRealTimers();
    });
  });
});
