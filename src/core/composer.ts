import { AnyArray } from './types';

/**
 * Combines two predicate functions into a single function that returns true
 * if both predicates return true for the given input.
 *
 * @template T
 * @param {(v: T) => boolean} prev - The first predicate function to evaluate.
 * @param {(v: T) => boolean} next - The second predicate function to evaluate.
 * @returns {(v: T) => boolean} A new function that takes an input value of type T
 * and returns true only if both predicate functions return true for that input.
 */
export const compose =
  <T>(prev: (v: T) => boolean, next: (v: T) => boolean): ((v: T) => boolean) =>
  v =>
    prev(v) && next(v);

/**
 * Composes two predicate functions into a single predicate function that returns true
 * only if both the provided functions return true for the same arguments.
 *
 * @template Args - The type of the arguments accepted by the predicate functions.
 * @param {(...args: Args) => boolean} prev - The first predicate function to be evaluated.
 * @param {(...args: Args) => boolean} next - The second predicate function to be evaluated.
 * @returns {(...args: Args) => boolean} A composed predicate function that returns true if both
 * the `prev` and `next` functions return true for the provided arguments; otherwise, it returns false.
 */
export const composeArgv =
  <Args extends AnyArray>(
    prev: (...args: Args) => boolean,
    next: (...args: Args) => boolean
  ): ((...args: Args) => boolean) =>
  (...args) =>
    prev(...args) && next(...args);

/**
 * A factory function that creates an object for managing a composed series of argument handlers.
 *
 * @template Args
 * @param {(...args: Args) => boolean} initial - The initial handler function that processes arguments.
 * @returns {Object} An object with methods to manage composed argument handlers.
 * @property {function(...args: Args): boolean} run - The current composed handler function.
 * @property {function((...args: Args) => boolean): void} push - A method to add a new handler function
 * to the composition, extending the functionality of the `run` method.
 */
export const composerArgv = <Args extends AnyArray>(
  initial: (...args: Args) => boolean
): {
  push(next: (...args: Args) => boolean): void;
  run: (...args: Args) => boolean;
} => ({
  push(next) {
    this.run = composeArgv(this.run, next);
  },
  run: initial,
});

/**
 * A utility function that creates a composer object for managing and composing
 * multiple functions of the same type.
 *
 * @template T
 * @param {(o: T) => boolean} initial - The initial function to be set as the starting point
 * in the composition.
 * @returns {Object} An object with the following properties:
 * - push: A method to add a new function to the composition. It updates the `run`
 *   property to represent the composed result of all added functions.
 * - run: The current composition of functions, starting with the initial function
 *   and including any subsequent additions via the `push` method.
 */
export const composer = <T>(
  initial: (o: T) => boolean
): {
  push(next: (o: T) => boolean): void;
  run: (o: T) => boolean;
} => ({
  push(next) {
    this.run = compose(this.run, next);
  },
  run: initial,
});
