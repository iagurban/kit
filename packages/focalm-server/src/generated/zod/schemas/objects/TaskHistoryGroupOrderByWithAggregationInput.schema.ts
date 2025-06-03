import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TaskHistoryGroupCountOrderByAggregateInputObjectSchema } from './TaskHistoryGroupCountOrderByAggregateInput.schema';
import { TaskHistoryGroupMaxOrderByAggregateInputObjectSchema } from './TaskHistoryGroupMaxOrderByAggregateInput.schema';
import { TaskHistoryGroupMinOrderByAggregateInputObjectSchema } from './TaskHistoryGroupMinOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    localCreatedAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    createdAtFixReason: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    _count: z.lazy(() => TaskHistoryGroupCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => TaskHistoryGroupMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => TaskHistoryGroupMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupOrderByWithAggregationInputObjectSchema = Schema;
