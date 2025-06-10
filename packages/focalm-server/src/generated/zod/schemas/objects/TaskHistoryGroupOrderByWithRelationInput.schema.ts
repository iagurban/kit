import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TaskHistoryValueOrderByRelationAggregateInputObjectSchema } from './TaskHistoryValueOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    localCreatedAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    createdAtFixReason: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    values: z.lazy(() => TaskHistoryValueOrderByRelationAggregateInputObjectSchema).optional(),
    author: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupOrderByWithRelationInputObjectSchema = Schema;
