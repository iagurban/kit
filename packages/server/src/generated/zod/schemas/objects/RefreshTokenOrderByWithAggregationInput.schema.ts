import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RefreshTokenCountOrderByAggregateInputObjectSchema } from './RefreshTokenCountOrderByAggregateInput.schema';
import { RefreshTokenMaxOrderByAggregateInputObjectSchema } from './RefreshTokenMaxOrderByAggregateInput.schema';
import { RefreshTokenMinOrderByAggregateInputObjectSchema } from './RefreshTokenMinOrderByAggregateInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    hash: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => RefreshTokenCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => RefreshTokenMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => RefreshTokenMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const RefreshTokenOrderByWithAggregationInputObjectSchema = Schema;
