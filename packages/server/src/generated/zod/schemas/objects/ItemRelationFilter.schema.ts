import { z } from 'zod';
import { ItemWhereInputObjectSchema } from './ItemWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemRelationFilter> = z
  .object({
    is: z
      .lazy(() => ItemWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ItemWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ItemRelationFilterObjectSchema = Schema;
