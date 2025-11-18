import { PromiseController } from './async/promise-controller';
import { CancelledError } from './errors/cancelled-error';

/**
 * Suspends the execution for a specified duration in milliseconds.
 * If a {@link PromiseController} is provided, the sleep can be interrupted.
 *
 * Notes about the controller model:
 * - The controller is an attachable, many-to-many broadcaster. `abort()` notifies all handlers
 *   currently registered on the controller, regardless of which operation they belong to.
 * - `sleep` subscribes its own internal handler and automatically unsubscribes it when the
 *   timeout fires (resolve) or when an abort occurs (reject). External handlers added by the caller
 *   remain the caller's responsibility: unsubscribe them via `ac.off(...)` when no longer needed.
 *
 * @param {number} ms - The number of milliseconds to pause execution.
 * @param {PromiseController} [ac] - Optional controller used to cancel the delay.
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
