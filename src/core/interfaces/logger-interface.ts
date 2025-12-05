export type LoggerContext = Record<string, unknown>;

/**
 * IBaseLogger defines a logger interface with various logging levels.
 * Each logging level allows logging messages with or without additional contextual information.
 */
export interface IBaseLogger {
  fatal(message: string): void;
  fatal<T extends LoggerContext>(o: T, message: string): void;

  error(message: string): void;
  error<T extends LoggerContext>(o: T, message: string): void;

  warn(message: string): void;
  warn<T extends LoggerContext>(o: T, message: string): void;

  info(message: string): void;
  info<T extends LoggerContext>(o: T, message: string): void;

  debug(message: string): void;
  debug<T extends LoggerContext>(o: T, message: string): void;

  trace(message: string): void;
  trace<T extends LoggerContext>(o: T, message: string): void;

  silent(message: string): void;
  silent<T extends LoggerContext>(o: T, message: string): void;
}

/**
 * Represents a logging interface that extends the functionality
 * of a base logger and provides additional methods for creating
 * child loggers.
 */
export interface ILogger extends IBaseLogger {
  child(bindings: LoggerContext): IBaseLogger;
}
