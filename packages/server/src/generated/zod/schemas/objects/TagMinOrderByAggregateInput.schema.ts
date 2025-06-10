import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const TagMinOrderByAggregateInputObjectSchema = Schema;
