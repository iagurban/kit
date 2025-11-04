import { catching, notNull, NullError, throwing, warnCatch } from './flow-utils';

describe('flow-utils', () => {
  describe('catching', () => {
    it('should return successful result', () => {
      const result = catching(
        () => 'success',
        () => 'fallback'
      );
      expect(result).toBe('success');
    });

    it('should return fallback on error', () => {
      const result = catching(
        () => {
          throw new Error('test error');
        },
        () => 'fallback'
      );
      expect(result).toBe('fallback');
    });

    it('should handle different return types', () => {
      const result = catching(
        () => {
          throw new Error('test error');
        },
        () => 42
      );
      expect(result).toBe(42);
    });
  });

  describe('warnCatch', () => {
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it('should execute function without warning on success', () => {
      warnCatch(() => {
        // successful operation
      });
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should log warning on error', () => {
      const error = new Error('test error');
      warnCatch(() => {
        throw error;
      });
      expect(consoleWarnSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('throwing', () => {
    it('should throw the error returned by the function', () => {
      const error = new Error('test error');
      expect(() => throwing(() => error)).toThrow(error);
    });

    it('should throw with correct type annotation', () => {
      const throwingFn = (): number => throwing(() => new Error('test'));
      expect(() => throwingFn()).toThrow('test');
    });
  });

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
});
