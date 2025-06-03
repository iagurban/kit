import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemWhereInputObjectSchema } from './ItemWhereInput.schema';

const Schema: z.ZodType<Prisma.ItemListRelationFilter> = z
  .object({
    every: z.lazy(() => ItemWhereInputObjectSchema).optional(),
    some: z.lazy(() => ItemWhereInputObjectSchema).optional(),
    none: z.lazy(() => ItemWhereInputObjectSchema).optional(),
  })
  .strict();

export const ItemListRelationFilterObjectSchema = Schema;
