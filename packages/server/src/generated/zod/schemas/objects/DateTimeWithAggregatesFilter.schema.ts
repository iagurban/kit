import { z } from 'zod';
import { NestedDateTimeWithAggregatesFilterObjectSchema } from './NestedDateTimeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.dateStr().optional(),
    in: z.union([z.coerce.dateStr().array(), z.coerce.dateStr()]).optional(),
    notIn: z.union([z.coerce.dateStr().array(), z.coerce.dateStr()]).optional(),
    lt: z.coerce.dateStr().optional(),
    lte: z.coerce.dateStr().optional(),
    gt: z.coerce.dateStr().optional(),
    gte: z.coerce.dateStr().optional(),
    not: z.union([z.coerce.dateStr(), z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
  })
  .strict();

export const DateTimeWithAggregatesFilterObjectSchema = Schema;
