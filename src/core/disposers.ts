import { Errors } from './errors/errors';

export type FunctionDisposable = () => () => void;
export type ObjectDisposable = { init(): void; destroy(): void };

/**
 * Creates a composite disposer function that manages multiple disposable resources.
 * Particularly useful for managing MobX reactions and store cleanup in a unified way.
 *
 * @param initializers - An array of disposable resources that can be either:
 *   - Functions that perform cleanup when called (FunctionDisposable)
 *   - Objects with init/destroy methods (ObjectDisposable)
 * The function automatically calls init() for object-style disposables during setup.
 *
 * @param onInit - Optional callback function to be executed after all initializers are set up
 *
 * @returns A cleanup function that when called:
 *   - Executes all collected disposers in the order they were added
 *   - Collects any errors that occur during disposal
 *   - If any errors occurred, throws an Errors instance containing all collected errors
 *
 * @example
 * ```typescript
 * const cleanup = disposers([
 *   // Function-style disposable
 *   reaction(() => ..., () => ...)),
 *   autorun(() => ...),
 *
 *   // Object-style disposable - e.g. some store with .init() and .destroy() methods
 *   {
 *     init: () => { // setup logic },
 *     destroy: () => { // cleanup logic }
 *   }
 * ]);
 *
 * // Later, cleanup all resources (or return it to somebody, who will clean up)
 * cleanup();
 * ```
 *
 * @throws {Errors} If any disposers throw during cleanup, all errors are collected
 *                  and thrown as a single Errors instance
 */
export const disposers = (
  initializers: readonly (FunctionDisposable | ObjectDisposable)[],
  onInit?: () => void
) => {
  const disposers: (() => void)[] = [];
  for (const i of initializers) {
    try {
      if (typeof i === `function`) {
        disposers.push(i());
      } else {
        i.init();
        disposers.push(() => i.destroy());
      }
    } catch (error) {
      for (const d of disposers) {
        d();
      }
      throw error;
    }
  }
  onInit?.();

  return () => {
    const errors: unknown[] = [];
    for (const d of disposers) {
      try {
        d();
      } catch (error) {
        errors.push(error);
      }
    }
    if (errors.length) {
      throw new Errors(errors);
    }
  };
};
