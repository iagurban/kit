import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ItemOrderByRelationAggregateInputObjectSchema } from './ItemOrderByRelationAggregateInput.schema';
import { MenuOrderByWithRelationInputObjectSchema } from './MenuOrderByWithRelationInput.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UploadedFileOrderByWithRelationInputObjectSchema } from './UploadedFileOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.ItemOrderByWithRelationInput> = z
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
    image: z.lazy(() => UploadedFileOrderByWithRelationInputObjectSchema).optional(),
    menu: z.lazy(() => MenuOrderByWithRelationInputObjectSchema).optional(),
    parent: z.lazy(() => ItemOrderByWithRelationInputObjectSchema).optional(),
    children: z.lazy(() => ItemOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ItemOrderByWithRelationInputObjectSchema = Schema;
