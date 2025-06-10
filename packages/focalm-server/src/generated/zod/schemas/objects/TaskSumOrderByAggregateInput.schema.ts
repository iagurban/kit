import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z
  .object({
    impact: z.lazy(() => SortOrderSchema).optional(),
    ease: z.lazy(() => SortOrderSchema).optional(),
    startAfterOffset: z.lazy(() => SortOrderSchema).optional(),
    plannedStartOffset: z.lazy(() => SortOrderSchema).optional(),
    dueToOffset: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TaskSumOrderByAggregateInputObjectSchema = Schema;
