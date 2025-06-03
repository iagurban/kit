import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    title: z.literal(true).optional(),
    ownerId: z.literal(true).optional(),
  })
  .strict();

export const MenuMinAggregateInputObjectSchema = Schema;
