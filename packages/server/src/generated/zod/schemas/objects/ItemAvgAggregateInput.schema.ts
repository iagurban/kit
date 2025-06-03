import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemAvgAggregateInputType> = z
  .object({
    price: z.literal(true).optional(),
  })
  .strict();

export const ItemAvgAggregateInputObjectSchema = Schema;
