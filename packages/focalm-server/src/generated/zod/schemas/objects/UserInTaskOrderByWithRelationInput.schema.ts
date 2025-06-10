import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TaskOrderByWithRelationInputObjectSchema } from './TaskOrderByWithRelationInput.schema';
import { UserInTaskTagOrderByRelationAggregateInputObjectSchema } from './UserInTaskTagOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    task: z.lazy(() => TaskOrderByWithRelationInputObjectSchema).optional(),
    tags: z.lazy(() => UserInTaskTagOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskOrderByWithRelationInputObjectSchema = Schema;
