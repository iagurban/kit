import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    hash: z.literal(true).optional(),
    size: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
  })
  .strict();

export const StoredFileMinAggregateInputObjectSchema = Schema;
