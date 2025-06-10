import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    taskId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const UserInTaskCountAggregateInputObjectSchema = Schema;
