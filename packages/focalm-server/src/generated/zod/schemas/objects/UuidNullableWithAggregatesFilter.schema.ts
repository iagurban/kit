import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedStringNullableFilterObjectSchema } from './NestedStringNullableFilter.schema';
import { NestedUuidNullableWithAggregatesFilterObjectSchema } from './NestedUuidNullableWithAggregatesFilter.schema';

const Schema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z
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
      .union([z.string(), z.lazy(() => NestedUuidNullableWithAggregatesFilterObjectSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterObjectSchema).optional(),
  })
  .strict();

export const UuidNullableWithAggregatesFilterObjectSchema = Schema;
