import { z, ZodType } from 'zod/v4';

export const isZodInput = <T extends ZodType>(schema: T, o: unknown): o is z.input<T> =>
  schema.safeEncode(o as z.output<T>).success;

export const isZodOutput = <T extends ZodType>(schema: T, o: unknown): o is z.output<T> =>
  schema.safeDecode(o as z.input<T>).success;
