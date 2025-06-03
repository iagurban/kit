import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ItemAvgOrderByAggregateInputObjectSchema } from './ItemAvgOrderByAggregateInput.schema';
import { ItemCountOrderByAggregateInputObjectSchema } from './ItemCountOrderByAggregateInput.schema';
import { ItemMaxOrderByAggregateInputObjectSchema } from './ItemMaxOrderByAggregateInput.schema';
import { ItemMinOrderByAggregateInputObjectSchema } from './ItemMinOrderByAggregateInput.schema';
import { ItemSumOrderByAggregateInputObjectSchema } from './ItemSumOrderByAggregateInput.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';

const Schema: z.ZodType<Prisma.ItemOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    orderKey: z.lazy(() => SortOrderSchema).optional(),
    title: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    description: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    price: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    archived: z.lazy(() => SortOrderSchema).optional(),
    imageId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputObjectSchema)]).optional(),
    _count: z.lazy(() => ItemCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => ItemAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ItemMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ItemMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ItemSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ItemOrderByWithAggregationInputObjectSchema = Schema;
