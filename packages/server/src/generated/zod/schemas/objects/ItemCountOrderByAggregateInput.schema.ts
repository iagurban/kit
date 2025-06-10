import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    orderKey: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    archived: z.lazy(() => SortOrderSchema).optional(),
    imageId: z.lazy(() => SortOrderSchema).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ItemCountOrderByAggregateInputObjectSchema = Schema;
