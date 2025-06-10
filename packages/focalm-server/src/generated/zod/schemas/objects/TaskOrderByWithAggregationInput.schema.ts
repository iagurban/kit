import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TaskAvgOrderByAggregateInputObjectSchema } from './TaskAvgOrderByAggregateInput.schema';
import { TaskCountOrderByAggregateInputObjectSchema } from './TaskCountOrderByAggregateInput.schema';
import { TaskMaxOrderByAggregateInputObjectSchema } from './TaskMaxOrderByAggregateInput.schema';
import { TaskMinOrderByAggregateInputObjectSchema } from './TaskMinOrderByAggregateInput.schema';
import { TaskSumOrderByAggregateInputObjectSchema } from './TaskSumOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    archived: z.lazy(() => SortOrderSchema).optional(),
    impact: z.lazy(() => SortOrderSchema).optional(),
    ease: z.lazy(() => SortOrderSchema).optional(),
    startAfterDate: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    startAfterOffset: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    plannedStartDate: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    plannedStartOffset: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    dueToDate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    dueToOffset: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    responsibleId: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    parentId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    orderKey: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TaskCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => TaskAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => TaskMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => TaskMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => TaskSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const TaskOrderByWithAggregationInputObjectSchema = Schema;
