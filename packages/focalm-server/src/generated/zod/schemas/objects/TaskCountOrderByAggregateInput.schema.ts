import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    archived: z.lazy(() => SortOrderSchema).optional(),
    impact: z.lazy(() => SortOrderSchema).optional(),
    ease: z.lazy(() => SortOrderSchema).optional(),
    startAfterDate: z.lazy(() => SortOrderSchema).optional(),
    startAfterOffset: z.lazy(() => SortOrderSchema).optional(),
    plannedStartDate: z.lazy(() => SortOrderSchema).optional(),
    plannedStartOffset: z.lazy(() => SortOrderSchema).optional(),
    dueToDate: z.lazy(() => SortOrderSchema).optional(),
    dueToOffset: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    responsibleId: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.lazy(() => SortOrderSchema).optional(),
    orderKey: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TaskCountOrderByAggregateInputObjectSchema = Schema;
