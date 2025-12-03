import { ProgrammingError } from './programming-error';

describe('ProgrammingError', () => {
  it('should create an instance with a message', () => {
    const error = new ProgrammingError('test message');
    expect(error).toBeInstanceOf(ProgrammingError);
    expect(error.message).toBe('Programming error: test message');
  });

  it('should create an instance without a message', () => {
    const error = new ProgrammingError();
    expect(error).toBeInstanceOf(ProgrammingError);
    expect(error.message).toBe('Programming error');
  });
});
