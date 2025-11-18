import { z } from 'zod/v4';

export const stringifiedBigint = z.codec(
  z.string().regex(/^[+-]?[0-9]+$/, 'Must be a string representation of an integer'),
  z.bigint(),
  {
    encode: v => v.toString(),
    decode: v => BigInt(v),
  }
);

export const stringifiedISODate = z
  .codec(z.iso.datetime(), z.date(), {
    encode: v => v.toISOString(),
    decode: v => new Date(v),
  })
  .refine(date => {
    if (isNaN(date.getTime())) {
      throw new Error(`invalid date`);
    }
    return date;
  });
