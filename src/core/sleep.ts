import { PromiseController } from './async/promise-controller';
import { CancelledError } from './errors/cancelled-error';

/**
 * Suspends the execution for a specified duration in milliseconds.
 * If a PromiseController is provided, the sleep can be interrupted.
 *
 * @param {number} ms - The number of milliseconds to pause execution.
 * @param {PromiseController} [ac] - Optional PromiseController instance used to control or cancel the delay.
 * @returns {Promise<void>} A Promise that resolves after the specified duration or rejects if interrupted.
 * @throws {CancelledError} Throws if the PromiseController cancels the sleep with a reason.
 */
export const sleep = (ms: number, ac?: PromiseController): Promise<void> =>
  ac
    ? new Promise((resolve, reject) => {
        const to = setTimeout(() => {
          ac.off(handler);
          resolve(undefined);
        }, ms);

        const handler = (reason: string) => {
          clearTimeout(to);
          ac.off(handler);
          reject(new CancelledError(reason));
        };
        ac.on(handler);
      })
    : new Promise(resolve => setTimeout(resolve, ms));
