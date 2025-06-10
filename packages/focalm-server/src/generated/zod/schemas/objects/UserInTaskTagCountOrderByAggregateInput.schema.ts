import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagCountOrderByAggregateInput> = z
  .object({
    userInTaskId: z.lazy(() => SortOrderSchema).optional(),
    tag: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserInTaskTagCountOrderByAggregateInputObjectSchema = Schema;
