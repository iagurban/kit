import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskTagCountAggregateInputType> = z
  .object({
    userInTaskId: z.literal(true).optional(),
    tag: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const UserInTaskTagCountAggregateInputObjectSchema = Schema;
