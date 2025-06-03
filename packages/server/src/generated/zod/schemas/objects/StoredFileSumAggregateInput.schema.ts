import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileSumAggregateInputType> = z
  .object({
    size: z.literal(true).optional(),
  })
  .strict();

export const StoredFileSumAggregateInputObjectSchema = Schema;
