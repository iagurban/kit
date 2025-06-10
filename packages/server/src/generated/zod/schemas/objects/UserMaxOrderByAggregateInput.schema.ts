import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserMaxOrderByAggregateInputObjectSchema = Schema;
