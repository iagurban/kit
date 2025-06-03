import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { NestedDateTimeNullableFilterObjectSchema } from './NestedDateTimeNullableFilter.schema';

const Schema: z.ZodType<Prisma.DateTimeNullableFilter> = z
  .object({
    equals: z.coerce.date().optional().nullable(),
    in: z.union([z.coerce.date().array(), z.coerce.date()]).optional().nullable(),
    notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const DateTimeNullableFilterObjectSchema = Schema;
