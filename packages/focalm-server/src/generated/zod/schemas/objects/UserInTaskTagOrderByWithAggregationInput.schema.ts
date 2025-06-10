import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserInTaskTagCountOrderByAggregateInputObjectSchema } from './UserInTaskTagCountOrderByAggregateInput.schema';
import { UserInTaskTagMaxOrderByAggregateInputObjectSchema } from './UserInTaskTagMaxOrderByAggregateInput.schema';
import { UserInTaskTagMinOrderByAggregateInputObjectSchema } from './UserInTaskTagMinOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagOrderByWithAggregationInput> = z
  .object({
    userInTaskId: z.lazy(() => SortOrderSchema).optional(),
    tag: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserInTaskTagCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => UserInTaskTagMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UserInTaskTagMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskTagOrderByWithAggregationInputObjectSchema = Schema;
