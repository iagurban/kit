import { z } from 'zod';
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.dateStr().optional(),
    in: z.union([z.coerce.dateStr().array(), z.coerce.dateStr()]).optional(),
    notIn: z.union([z.coerce.dateStr().array(), z.coerce.dateStr()]).optional(),
    lt: z.coerce.dateStr().optional(),
    lte: z.coerce.dateStr().optional(),
    gt: z.coerce.dateStr().optional(),
    gte: z.coerce.dateStr().optional(),
    not: z.union([z.coerce.dateStr(), z.lazy(() => NestedDateTimeFilterObjectSchema)]).optional(),
  })
  .strict();

export const DateTimeFilterObjectSchema = Schema;
