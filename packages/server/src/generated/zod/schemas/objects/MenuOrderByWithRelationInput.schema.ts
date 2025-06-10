import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ItemOrderByRelationAggregateInputObjectSchema } from './ItemOrderByRelationAggregateInput.schema';
import { TagOrderByRelationAggregateInputObjectSchema } from './TagOrderByRelationAggregateInput.schema';
import { UploadedFileOrderByRelationAggregateInputObjectSchema } from './UploadedFileOrderByRelationAggregateInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    ownerId: z.lazy(() => SortOrderSchema).optional(),
    owner: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    items: z.lazy(() => ItemOrderByRelationAggregateInputObjectSchema).optional(),
    tags: z.lazy(() => TagOrderByRelationAggregateInputObjectSchema).optional(),
    files: z.lazy(() => UploadedFileOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const MenuOrderByWithRelationInputObjectSchema = Schema;
