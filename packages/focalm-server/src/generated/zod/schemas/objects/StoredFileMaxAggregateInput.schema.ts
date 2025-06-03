import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    hash: z.literal(true).optional(),
    size: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
  })
  .strict();

export const StoredFileMaxAggregateInputObjectSchema = Schema;
