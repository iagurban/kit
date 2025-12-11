import { resolveRecord } from './promise-util';

describe('promise-util', () => {
  describe('resolveRecord', () => {
    it('should resolve all promise values in the object while keeping the structure', async () => {
      const input = {
        a: Promise.resolve(1),
        b: Promise.resolve(2),
        c: 'not a promise',
      };
      const result = await resolveRecord(input);

      expect(result).toEqual({
        a: 1,
        b: 2,
        c: 'not a promise',
      });
    });

    it('should handle an empty object', async () => {
      const input = {};
      const result = await resolveRecord(input);

      expect(result).toEqual({});
    });

    it('should resolve only the promise values and retain non-promise values as is', async () => {
      const input = {
        x: Promise.resolve('resolved'),
        y: 42,
        z: 'unchanged',
      };
      const result = await resolveRecord(input);

      expect(result).toEqual({
        x: 'resolved',
        y: 42,
        z: 'unchanged',
      });
    });

    it('should resolve nested promises if present', async () => {
      const nestedPromise = Promise.resolve(Promise.resolve(10));
      const input = {
        nested: nestedPromise,
      };
      const result = await resolveRecord(input);

      expect(result).toEqual({
        nested: await nestedPromise,
      });
    });

    it('should handle objects with no promises correctly', async () => {
      const input = {
        a: 123,
        b: 'test',
        c: true,
      };
      const result = await resolveRecord(input);

      expect(result).toEqual({
        a: 123,
        b: 'test',
        c: true,
      });
    });

    it('should reject when any promise within the object rejects', async () => {
      const input = {
        a: Promise.resolve(1),
        b: Promise.reject(new Error('Test rejection')),
      };

      await expect(resolveRecord(input)).rejects.toThrow('Test rejection');
    });
  });
});
