import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileSumOrderByAggregateInput> = z
  .object({
    size: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const StoredFileSumOrderByAggregateInputObjectSchema = Schema;
