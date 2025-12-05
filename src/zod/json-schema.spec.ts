import { z } from 'zod/v4';

import { jsonLiteralSchema, jsonObjectSchema, jsonValueSchema } from './json-schema';

const check = (schema: z.ZodTypeAny, value: unknown) => {
  const encoded = z.encode(schema, value);
  const decoded = z.decode(schema, encoded);
  expect(decoded).toEqual(value);
};

describe('JSON Schemas', () => {
  describe('jsonLiteralSchema', () => {
    it('should encode and decode a string', () => {
      check(jsonLiteralSchema, 'hello');
    });

    it('should encode and decode a number', () => {
      check(jsonLiteralSchema, 123);
    });

    it('should encode and decode a boolean', () => {
      check(jsonLiteralSchema, true);
    });

    it('should encode and decode null', () => {
      check(jsonLiteralSchema, null);
    });
  });

  describe('jsonValueSchema', () => {
    it('should encode and decode a nested array', () => {
      check(jsonValueSchema, [1, 'two', [true, null]]);
    });

    it('should encode and decode a nested object', () => {
      check(jsonValueSchema, {
        a: 1,
        b: 'two',
        c: {
          d: true,
          e: null,
        },
      });
    });
  });

  describe('jsonObjectSchema', () => {
    it('should encode and decode a simple object', () => {
      check(jsonObjectSchema, { a: 1, b: 'two', c: true, d: null });
    });

    it('should encode and decode an object with nested arrays and objects', () => {
      check(jsonObjectSchema, {
        a: [1, 2],
        b: { c: 'hello' },
      });
    });
  });
});
