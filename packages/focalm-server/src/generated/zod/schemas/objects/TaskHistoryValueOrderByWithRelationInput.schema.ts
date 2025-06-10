import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TaskHistoryGroupOrderByWithRelationInputObjectSchema } from './TaskHistoryGroupOrderByWithRelationInput.schema';
import { TaskOrderByWithRelationInputObjectSchema } from './TaskOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueOrderByWithRelationInput> = z
  .object({
    groupId: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
    key: z.lazy(() => SortOrderSchema).optional(),
    op: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    group: z.lazy(() => TaskHistoryGroupOrderByWithRelationInputObjectSchema).optional(),
    task: z.lazy(() => TaskOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueOrderByWithRelationInputObjectSchema = Schema;
