import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueMaxOrderByAggregateInput> = z
  .object({
    groupId: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
    key: z.lazy(() => SortOrderSchema).optional(),
    op: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TaskHistoryValueMaxOrderByAggregateInputObjectSchema = Schema;
