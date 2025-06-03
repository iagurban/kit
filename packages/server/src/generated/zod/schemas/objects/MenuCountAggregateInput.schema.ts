import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    title: z.literal(true).optional(),
    ownerId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const MenuCountAggregateInputObjectSchema = Schema;
