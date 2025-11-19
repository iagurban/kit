import { retrying } from './retrying';

describe('retrying', () => {
  it('should resolve the result on the first successful attempt', async () => {
    const mockFn = jest.fn((attempt: number) => Promise.resolve(`success-${attempt}`));
    const mockShouldRetry = jest.fn(); // No retries expected

    const result = await retrying(mockShouldRetry, mockFn);

    expect(result).toBe('success-1');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockShouldRetry).not.toHaveBeenCalled();
  });

  it('should retry when shouldRetry returns true, and then resolve', async () => {
    let failCount = 0;
    const mockFn = jest.fn((attempt: number) => {
      if (++failCount < 3) {
        return Promise.reject(new Error(`error-${attempt}`));
      }
      return Promise.resolve(`success-${attempt}`);
    });
    const mockShouldRetry = jest.fn(() => true);

    const result = await retrying(mockShouldRetry, mockFn);

    expect(result).toBe('success-3');
    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockShouldRetry).toHaveBeenCalledTimes(2);
  });

  it('should retry with delay when shouldRetry returns a number', async () => {
    jest.useFakeTimers();
    let failCount = 0;
    const mockFn = jest.fn((attempt: number) => {
      if (++failCount < 2) {
        return Promise.reject(new Error(`error-${attempt}`));
      }
      return Promise.resolve(`success-${attempt}`);
    });
    const mockShouldRetry = jest.fn((error: unknown, attempt: number) => (attempt === 1 ? 1000 : false));

    const retryPromise = retrying(mockShouldRetry, mockFn);

    // Advance fake timers and flush any pending microtasks from the timer callback
    await jest.advanceTimersByTimeAsync(1000); // Simulate 1-second delay
    const result = await retryPromise;

    expect(result).toBe('success-2');
    expect(mockFn).toHaveBeenCalledTimes(2);
    // `shouldRetry` is called only after failed attempts. First attempt fails (1 call),
    // second attempt succeeds so it is not called again.
    expect(mockShouldRetry).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it('should throw the last error if shouldRetry returns false', async () => {
    const mockFn = jest.fn((attempt: number) => Promise.reject(new Error(`error-${attempt}`)));
    const mockShouldRetry = jest.fn((error: unknown, attempt: number) => false);

    await expect(retrying(mockShouldRetry, mockFn)).rejects.toThrow('error-1');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockShouldRetry).toHaveBeenCalledTimes(1);
  });

  it('should stop retrying if shouldRetry returns undefined', async () => {
    const mockFn = jest.fn((attempt: number) => Promise.reject(new Error(`error-${attempt}`)));
    const mockShouldRetry = jest.fn((error: unknown, attempt: number) => undefined);

    await expect(retrying(mockShouldRetry, mockFn)).rejects.toThrow('error-1');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockShouldRetry).toHaveBeenCalledTimes(1);
  });
});
