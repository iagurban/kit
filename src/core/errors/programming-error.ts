/**
 * Indicates a programming error (unrecoverable; need to be fixed by code change)
 */
export class ProgrammingError extends Error {
  constructor(message: string) {
    super(`Programming error` + (message ? `: ${message}` : ``));
  }
}
