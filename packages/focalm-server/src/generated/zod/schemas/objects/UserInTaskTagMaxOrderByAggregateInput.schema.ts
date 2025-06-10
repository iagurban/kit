import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagMaxOrderByAggregateInput> = z
  .object({
    userInTaskId: z.lazy(() => SortOrderSchema).optional(),
    tag: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserInTaskTagMaxOrderByAggregateInputObjectSchema = Schema;
