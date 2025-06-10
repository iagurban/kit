import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserInTaskCountOrderByAggregateInputObjectSchema } from './UserInTaskCountOrderByAggregateInput.schema';
import { UserInTaskMaxOrderByAggregateInputObjectSchema } from './UserInTaskMaxOrderByAggregateInput.schema';
import { UserInTaskMinOrderByAggregateInputObjectSchema } from './UserInTaskMinOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserInTaskCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => UserInTaskMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UserInTaskMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskOrderByWithAggregationInputObjectSchema = Schema;
