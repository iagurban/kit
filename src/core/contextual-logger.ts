import { IBaseLogger, ILogger, LoggerContext } from './interfaces/logger-interface';

/**
 * Creates a contextual logger by extending the base logger with additional context information.
 *
 * @param {ILogger} logger - The base logger instance to extend.
 * @param {string} name - The name of the context to associate with the logger.
 * @param {LoggerContext} [payload] - Optional additional context information to include.
 * @returns {IBaseLogger} A new logger instance with the provided contextual information.
 */
export const createContextualLogger = (logger: ILogger, name: string, payload?: LoggerContext): IBaseLogger =>
  logger.child({ ...payload, context: name });
