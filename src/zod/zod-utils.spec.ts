import { z } from 'zod/v4-mini';

import { stringifiedISODate } from './stringified-types';
import { isZodInput, isZodOutput } from './zod-utils';

describe('Zod Utils', () => {
  // Use a codec where input and output types are different to properly test the functions.
  const schema = stringifiedISODate;
  const validInput = '2023-10-27T10:00:00.000Z';
  const validOutput = new Date(validInput);
  const invalidInput = 'not a date';
  const invalidOutput = new Date('invalid date'); // This will be an invalid Date object

  describe('isZodInput', () => {
    it('should return true for a valid input value', () => {
      expect(isZodInput(schema, validInput)).toBe(true);
    });

    it('should return false for an invalid input value', () => {
      expect(isZodInput(schema, invalidInput)).toBe(false);
    });

    it('should return false for a valid output value', () => {
      // A Date object is not a valid *input* for the stringifiedISODate codec
      expect(isZodInput(schema, validOutput)).toBe(false);
    });

    it('should return false for an invalid output value', () => {
      expect(isZodInput(schema, invalidOutput)).toBe(false);
    });
  });

  describe('isZodOutput', () => {
    it('should return true for a valid output value', () => {
      expect(isZodOutput(schema, validOutput)).toBe(true);
    });

    it('should return false for an invalid output value', () => {
      // The .refine() on stringifiedISODate should catch this during the safeEncode check
      expect(isZodOutput(schema, invalidOutput)).toBe(false);
    });

    it('should return false for a valid input value', () => {
      // A string is not a valid *output* for the stringifiedISODate codec
      expect(isZodOutput(schema, validInput)).toBe(false);
    });

    it('should return false for an invalid input value', () => {
      expect(isZodOutput(schema, invalidInput)).toBe(false);
    });
  });

  // Also test with a simple schema where input and output are the same
  describe('with simple schema (z.number)', () => {
    const simpleSchema = z.number();

    it('isZodInput should return true for a valid number', () => {
      expect(isZodInput(simpleSchema, 123)).toBe(true);
    });

    it('isZodInput should return false for a non-number', () => {
      expect(isZodInput(simpleSchema, '123')).toBe(false);
    });

    it('isZodOutput should return true for a valid number', () => {
      expect(isZodOutput(simpleSchema, 123)).toBe(true);
    });

    it('isZodOutput should return false for a non-number', () => {
      expect(isZodOutput(simpleSchema, '123')).toBe(false);
    });
  });
});
