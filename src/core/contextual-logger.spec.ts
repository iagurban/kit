import { createContextualLogger } from './contextual-logger';
import { ILogger } from './interfaces/logger-interface';

describe('createContextualLogger', () => {
  it('should call the child method on the logger with the correct context', () => {
    const mockLogger: ILogger = {
      child: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      fatal: jest.fn(),
      trace: jest.fn(),
      silent: jest.fn(),
    };
    const contextName = 'test-context';
    const logger = createContextualLogger(mockLogger, contextName);

    expect(mockLogger.child).toHaveBeenCalledWith({ context: contextName });
  });

  it('should call the child method on the logger with the correct context and payload', () => {
    const mockLogger: ILogger = {
      child: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      fatal: jest.fn(),
      trace: jest.fn(),
      silent: jest.fn(),
    };
    const contextName = 'test-context';
    const payload = { some: 'data' };
    const logger = createContextualLogger(mockLogger, contextName, payload);

    expect(mockLogger.child).toHaveBeenCalledWith({
      ...payload,
      context: contextName,
    });
  });
});
