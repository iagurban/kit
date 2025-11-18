export class CancelledError extends Error {
  constructor(reason: string) {
    super(`Cancelled with reason: ${reason}`);
  }
}
