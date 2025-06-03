import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemSumAggregateInputType> = z
  .object({
    price: z.literal(true).optional(),
  })
  .strict();

export const ItemSumAggregateInputObjectSchema = Schema;
