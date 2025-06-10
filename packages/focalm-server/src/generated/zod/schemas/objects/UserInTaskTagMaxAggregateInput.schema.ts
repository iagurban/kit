import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskTagMaxAggregateInputType> = z
  .object({
    userInTaskId: z.literal(true).optional(),
    tag: z.literal(true).optional(),
  })
  .strict();

export const UserInTaskTagMaxAggregateInputObjectSchema = Schema;
