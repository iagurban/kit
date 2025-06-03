import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    state: z.lazy(() => SortOrderSchema).optional(),
    archived: z.lazy(() => SortOrderSchema).optional(),
    impact: z.lazy(() => SortOrderSchema).optional(),
    ease: z.lazy(() => SortOrderSchema).optional(),
    startAfter: z.lazy(() => SortOrderSchema).optional(),
    plannedStart: z.lazy(() => SortOrderSchema).optional(),
    dueTo: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    responsibleId: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.lazy(() => SortOrderSchema).optional(),
    orderKey: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TaskMinOrderByAggregateInputObjectSchema = Schema;
