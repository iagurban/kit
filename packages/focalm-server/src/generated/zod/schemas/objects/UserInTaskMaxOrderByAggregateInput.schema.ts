import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.UserInTaskMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    taskId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserInTaskMaxOrderByAggregateInputObjectSchema = Schema;
