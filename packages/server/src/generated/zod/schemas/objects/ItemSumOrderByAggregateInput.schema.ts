import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemSumOrderByAggregateInput> = z
  .object({
    price: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ItemSumOrderByAggregateInputObjectSchema = Schema;
