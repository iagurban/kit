import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskCreateManyUserInput> = z
  .object({
    id: z.string().optional(),
    taskId: z.string(),
  })
  .strict();

export const UserInTaskCreateManyUserInputObjectSchema = Schema;
