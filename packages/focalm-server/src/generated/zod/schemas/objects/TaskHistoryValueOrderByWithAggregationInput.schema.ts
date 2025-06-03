import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TaskHistoryValueCountOrderByAggregateInputObjectSchema } from './TaskHistoryValueCountOrderByAggregateInput.schema';
import { TaskHistoryValueMaxOrderByAggregateInputObjectSchema } from './TaskHistoryValueMaxOrderByAggregateInput.schema';
import { TaskHistoryValueMinOrderByAggregateInputObjectSchema } from './TaskHistoryValueMinOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueOrderByWithAggregationInput> = z
  .object({
    groupId: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
    key: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TaskHistoryValueCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => TaskHistoryValueMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => TaskHistoryValueMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueOrderByWithAggregationInputObjectSchema = Schema;
