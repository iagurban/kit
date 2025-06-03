import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.ItemSumOrderByAggregateInput> = z
  .object({
    price: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ItemSumOrderByAggregateInputObjectSchema = Schema;
