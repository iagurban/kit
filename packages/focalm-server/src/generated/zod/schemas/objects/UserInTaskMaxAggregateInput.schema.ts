import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    taskId: z.literal(true).optional(),
  })
  .strict();

export const UserInTaskMaxAggregateInputObjectSchema = Schema;
