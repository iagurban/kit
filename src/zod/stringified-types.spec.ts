import { z } from 'zod/v4';

import { stringifiedBigint, stringifiedISODate } from './stringified-types';

const check = (schema: z.ZodTypeAny, value: unknown) => {
  const encoded = z.encode(schema, value);
  const decoded = z.decode(schema, encoded);
  expect(decoded).toEqual(value);
};

describe('Stringified Schemas', () => {
  describe('stringifiedBigint', () => {
    it('should encode and decode a positive bigint', () => {
      check(stringifiedBigint, 12345678901234567890n);
    });

    it('should encode and decode a negative bigint', () => {
      check(stringifiedBigint, -12345678901234567890n);
    });

    it('should encode and decode zero', () => {
      check(stringifiedBigint, 0n);
    });

    it('should throw when decoding a non-integer string', () => {
      expect(() => z.decode(stringifiedBigint, '123.45')).toThrow();
    });

    it('should throw when decoding a non-numeric string', () => {
      expect(() => z.decode(stringifiedBigint, 'not-a-number')).toThrow();
    });
  });

  describe('stringifiedISODate', () => {
    it('should encode and decode a valid date', () => {
      const date = new Date('2023-10-26T10:00:00.000Z');
      check(stringifiedISODate, date);
    });

    it('should encode and decode the current date', () => {
      // To avoid millisecond precision issues, create a new date and zero out the milliseconds.
      const now = new Date();
      now.setMilliseconds(0);
      check(stringifiedISODate, now);
    });

    it('should throw when decoding an invalid date string', () => {
      expect(() => z.decode(stringifiedISODate, 'not-a-valid-date')).toThrow();
    });

    it('should throw when decoding a string that results in an invalid date object', () => {
      // z.iso.datetime() will catch this format, so the test is for the initial validation.
      expect(() => z.decode(stringifiedISODate, '2023-13-01T00:00:00.000Z')).toThrow();
    });

    it('should throw when encoding an invalid Date object', () => {
      const invalidDateString = 'not-a-real-date';
      expect(() => z.decode(stringifiedISODate, invalidDateString)).toThrow(/"Invalid ISO datetime"/);

      const invalidDate = new Date('not-a-real-date');
      expect(() => z.encode(stringifiedISODate, invalidDate)).toThrow(
        /"Invalid input: expected date, received Date"/
      );
    });
  });
});
