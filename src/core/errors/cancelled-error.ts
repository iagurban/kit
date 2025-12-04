/**
 * An error that is thrown when an operation is cancelled.
 */
export class CancelledError extends Error {
  /**
   * Creates a new CancelledError.
   * @param reason The reason for the cancellation.
   */
  constructor(reason: string) {
    super(`Cancelled with reason: ${reason}`);
  }
}
