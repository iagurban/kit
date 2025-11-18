import { NullError } from '../errors/null-error';
import { notNull } from './not-null';

describe('notNull', () => {
  describe('with non-null values', () => {
    it('should return the value if not null', () => {
      expect(notNull('test')).toBe('test');
      expect(notNull(42)).toBe(42);
      expect(notNull({ key: 'value' })).toEqual({ key: 'value' });
    });
  });

  describe('with null/undefined values', () => {
    it('should throw NullError with default message for null', () => {
      expect(() => notNull(null)).toThrow(NullError);
      expect(() => notNull(null)).toThrow('arg is null');
    });

    it('should throw NullError with default message for undefined', () => {
      expect(() => notNull(undefined)).toThrow(NullError);
      expect(() => notNull(undefined)).toThrow('arg is null');
    });

    it('should throw NullError with custom string message', () => {
      expect(() => notNull(null, 'custom message')).toThrow('custom message');
    });

    it('should throw NullError with custom error message from function', () => {
      expect(() => notNull(null, () => 'custom function message')).toThrow('custom function message');
    });

    it('should throw custom error from function', () => {
      const customError = new Error('custom error');
      expect(() => notNull(null, () => customError)).toThrow(customError);
    });
  });

  describe('type inference', () => {
    it('should properly narrow types', () => {
      const value: string | null = 'test';
      const result: string = notNull(value);
      expect(result).toBe('test');
    });

    it('should work with undefined types', () => {
      const value: string | undefined = 'test';
      const result: string = notNull(value);
      expect(result).toBe('test');
    });
  });
});
