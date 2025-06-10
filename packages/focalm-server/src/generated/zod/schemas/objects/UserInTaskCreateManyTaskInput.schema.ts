import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskCreateManyTaskInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
  })
  .strict();

export const UserInTaskCreateManyTaskInputObjectSchema = Schema;
