import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MenuCountOrderByAggregateInputObjectSchema } from './MenuCountOrderByAggregateInput.schema';
import { MenuMaxOrderByAggregateInputObjectSchema } from './MenuMaxOrderByAggregateInput.schema';
import { MenuMinOrderByAggregateInputObjectSchema } from './MenuMinOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.MenuOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    ownerId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => MenuCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => MenuMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => MenuMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const MenuOrderByWithAggregationInputObjectSchema = Schema;
