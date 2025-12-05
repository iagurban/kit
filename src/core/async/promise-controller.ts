import { ExMap } from '../collections/ex-map';
import { Errors } from '../errors/errors';

/**
 * A class that provides a mechanism to broadcast abortion (cancellation) events.
 *
 * Architectural choice: attachable many-to-many controller
 * - This controller can be shared across multiple concurrent or sequential operations.
 * - Calling {@link abort} notifies all handlers that are registered at the moment of the call,
 *   regardless of which operation they belong to or whether some operations have already finished.
 * - Libraries that use the controller (e.g., {@link sleep}) must unsubscribe their own internal
 *   handlers when their operation completes or is aborted.
 * - Client code is responsible for unsubscribing its own handlers via {@link off} when they are no
 *   longer needed (e.g., after a successful operation) to avoid receiving future abort notifications.
 *
 * This aligns with a broadcaster-style cancellation model similar in spirit to AbortController,
 * without introducing a new cancellable-promise API. If per-operation isolation is required,
 * create a dedicated controller instance for that operation or ensure handlers are removed on
 * completion.
 */
export class PromiseController {
  private _aborted = false;

  private readonly onAborts = new ExMap<(reason: string) => void, number>();

  /**
   * Retrieves the current aborted state.
   *
   * @return {boolean} The value of the aborted state.
   */
  get aborted(): boolean {
    return this._aborted;
  }

  /**
   * Aborts and notifies all currently registered abort handlers.
   *
   * Notes:
   * - Handlers are invoked in the order provided by the underlying map’s iteration order.
   * - After notification, all handlers are cleared, and the controller remains in the aborted state.
   * - If any handler throws, an {@link Errors} aggregating all thrown errors is raised after
   *   all handlers have been invoked.
   *
   * @param {string} reason - The reason for aborting.
   */
  readonly abort = (reason: string): void => {
    if (this._aborted) {
      return;
    }
    this._aborted = true;
    const errors: unknown[] = [];
    for (const v of this.onAborts.keys()) {
      try {
        v(reason);
      } catch (e) {
        errors.push(e);
      }
    }
    this.onAborts.clear();
    if (errors.length > 0) {
      throw new Errors(errors);
    }
  };

  /**
   * Registers an abort handler.
   *
   * Handlers will be called upon {@link abort} while they remain registered. If you add a handler for a
   * specific operation, remember to call {@link off} when the operation finishes successfully and you no longer
   * want to receive abort notifications.
   *
   * @param {function} fn - A callback function that receives the abort reason.
   */
  on(fn: (reason: string) => void): void {
    this.onAborts.update(fn, n => (n || 0) + 1);
  }

  /**
   * Removes a handler from the list of abort handlers. If `all` is true, removes all instances; otherwise, decrements its count.
   *
   * @param {Function} fn - The handler to remove.
   * @param {boolean} [all=false] - If true, removes all occurrences. Defaults to removing a single occurrence.
   */
  off(fn: (reason: string) => void, all: boolean = false): void {
    const count = this.onAborts.get(fn);
    if (count === undefined) {
      return;
    }
    if (all || count === 1) {
      this.onAborts.delete(fn);
    } else {
      this.onAborts.set(fn, count - 1);
    }
  }
}
