import { z } from 'zod/v4';

export const stringifiedBigint = z
  .string()
  .regex(/^[+-]?[0-9]+$/, 'Must be a string representation of an integer')
  .pipe(z.coerce.bigint());

export const stringifiedISODate = z.iso.date().pipe(z.coerce.date());
