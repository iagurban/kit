import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.NestedDateTimeFilter> = z
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

export const NestedDateTimeFilterObjectSchema = Schema;
