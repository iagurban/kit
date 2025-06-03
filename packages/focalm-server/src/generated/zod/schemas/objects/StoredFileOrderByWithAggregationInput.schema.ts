import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { StoredFileAvgOrderByAggregateInputObjectSchema } from './StoredFileAvgOrderByAggregateInput.schema';
import { StoredFileCountOrderByAggregateInputObjectSchema } from './StoredFileCountOrderByAggregateInput.schema';
import { StoredFileMaxOrderByAggregateInputObjectSchema } from './StoredFileMaxOrderByAggregateInput.schema';
import { StoredFileMinOrderByAggregateInputObjectSchema } from './StoredFileMinOrderByAggregateInput.schema';
import { StoredFileSumOrderByAggregateInputObjectSchema } from './StoredFileSumOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.StoredFileOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    hash: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => StoredFileCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => StoredFileAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => StoredFileMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => StoredFileMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => StoredFileSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileOrderByWithAggregationInputObjectSchema = Schema;
