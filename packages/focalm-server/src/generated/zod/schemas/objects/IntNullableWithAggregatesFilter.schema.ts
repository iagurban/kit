import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { NestedFloatNullableFilterObjectSchema } from './NestedFloatNullableFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedIntNullableWithAggregatesFilterObjectSchema } from './NestedIntNullableWithAggregatesFilter.schema';

const Schema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.union([z.number().array(), z.number()]).optional().nullable(),
    notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterObjectSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  })
  .strict();

export const IntNullableWithAggregatesFilterObjectSchema = Schema;
