import { ExMap } from '../collections/ex-map';
import { Errors } from '../errors/errors';

/**
 * A class that provides a mechanism to handle the abortion of asynchronous operations.
 * It maintains a set of listeners that can be notified when an abortion occurs.
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
   * Aborts the current operation and notifies all registered abort handlers.
   *
   * @param {string} reason - The reason for aborting the operation.
   * @return {void} - Does not return a value. Throws an error if any abort handlers throw exceptions.
   */
  abort(reason: string): void {
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
  }

  /**
   * Registers a callback function to be executed when a specific event occurs.
   *
   * @param {function} fn - A callback function that receives a string parameter representing the reason for the event.
   * @return {void}
   */
  on(fn: (reason: string) => void): void {
    this.onAborts.update(fn, n => (n || 0) + 1);
  }

  /**
   * Removes a function from the list of abort handlers. If `all` is true, it removes all instances of the given function; otherwise, it decrements its count.
   *
   * @param {Function} fn - The function to remove from the list of abort handlers. It receives a reason string when called.
   * @param {boolean} [all=false] - If true, removes all occurrences of the function from the abort handlers. Defaults to false, removing only one occurrence.
   * @return {void} This method does not return a value.
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
