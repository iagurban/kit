/**
 * An error that represents a collection of multiple errors.
 */
export class Errors extends Error {
  /**
   * Creates a new Errors instance.
   * @param errors The errors to include in this collection.
   */
  constructor(public readonly errors: unknown[]) {
    super(`multiple errors: ${errors.join(`\n`)}`);
  }
}
