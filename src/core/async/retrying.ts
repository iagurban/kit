import { sleep } from '../sleep';

/**
 * A function type definition that determines whether a retry should occur based on the provided error and attempt number.
 *
 * @param {unknown} error - The error object or value that was encountered during the previous attempt.
 * @param {number} attempt - The current attempt number, starting from 1 for the first attempt.
 * @returns {boolean | number | undefined | Promise<boolean | number | undefined>} - A return value to indicate retry behavior:
 *   - `true`: A retry should occur immediately.
 *   - `false`: No more retries should occur.
 *   - `number`: The delay in milliseconds to wait before retrying.
 *   - `undefined`: The default behavior or fallback logic should be used.
 *   - `Promise`: A promise resolving to any of the above return types to allow for asynchronous evaluation of retry behavior.
 */
export type ShouldRetryFn = (
  error: unknown,
  attempt: number
) => boolean | number | undefined | Promise<boolean | number | undefined>;

/**
 * Executes a function with retry logic, allowing for custom retry conditions and delays.
 *
 * @param {ShouldRetryFn} shouldRetry - A function that determines whether a retry should occur.
 *        It receives the error and the current attempt number as arguments and returns a boolean
 *        (indicating whether to retry), a number (indicating how many milliseconds to wait before retrying),
 *        or anything else to terminate retries.
 * @param {(attempt: number) => Promise<T>} fn - The function to be executed with retries. It receives
 *        the current attempt number as an argument and returns a promise.
 * @return {Promise<T>} A promise that resolves with the result of the function if successful, or rejects
 *         with the last encountered error if no further retries are allowed.
 */
export async function retrying<T>(
  shouldRetry: ShouldRetryFn,
  fn: (attempt: number) => Promise<T>
): Promise<T> {
  for (let attempt = 1; ; ++attempt) {
    try {
      return await fn(attempt);
    } catch (error) {
      const retryAction = await shouldRetry(error, attempt);

      if (retryAction === true) {
        continue;
      }

      if (typeof retryAction === 'number' && retryAction > 0) {
        await sleep(retryAction);
        continue;
      }

      throw error;
    }
  }
}
