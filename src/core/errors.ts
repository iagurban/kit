export class Errors extends Error {
  constructor(public readonly errors: unknown[]) {
    super(`multiple errors: ${errors.join(`\n`)}`);
  }
}
