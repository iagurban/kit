import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TaskHistoryValueOrderByRelationAggregateInputObjectSchema } from './TaskHistoryValueOrderByRelationAggregateInput.schema';
import { TaskOrderByRelationAggregateInputObjectSchema } from './TaskOrderByRelationAggregateInput.schema';
import { UserInTaskOrderByRelationAggregateInputObjectSchema } from './UserInTaskOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z
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
    author: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    responsible: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    parent: z.lazy(() => TaskOrderByWithRelationInputObjectSchema).optional(),
    children: z.lazy(() => TaskOrderByRelationAggregateInputObjectSchema).optional(),
    participants: z.lazy(() => UserInTaskOrderByRelationAggregateInputObjectSchema).optional(),
    historyValues: z.lazy(() => TaskHistoryValueOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const TaskOrderByWithRelationInputObjectSchema = Schema;
