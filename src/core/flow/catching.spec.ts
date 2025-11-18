import { catching, warnCatch } from './catching';

describe('catching', () => {
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
});
