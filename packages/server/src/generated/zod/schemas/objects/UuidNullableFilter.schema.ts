import { z } from 'zod';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedUuidNullableFilterObjectSchema } from './NestedUuidNullableFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UuidNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.union([z.string().array(), z.string()]).optional().nullable(),
    notIn: z.union([z.string().array(), z.string()]).optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidNullableFilterObjectSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UuidNullableFilterObjectSchema = Schema;
