import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';

const Schema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
    notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterObjectSchema = Schema;
