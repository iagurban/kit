import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemWhereInputObjectSchema } from './ItemWhereInput.schema';

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
