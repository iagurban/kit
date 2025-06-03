import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    expiresAt: z.literal(true).optional(),
    hash: z.literal(true).optional(),
  })
  .strict();

export const RefreshTokenMaxAggregateInputObjectSchema = Schema;
