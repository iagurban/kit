type LoggerContext = Record<string, unknown>;

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

export interface ILogger extends IBaseLogger {
  child(bindings: LoggerContext): IBaseLogger;
}

export const createContextualLogger = (logger: ILogger, name: string, payload?: LoggerContext): IBaseLogger =>
  logger.child({ ...payload, context: name });
