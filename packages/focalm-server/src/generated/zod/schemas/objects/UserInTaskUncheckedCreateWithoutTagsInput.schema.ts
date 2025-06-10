import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedCreateWithoutTagsInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    taskId: z.string(),
  })
  .strict();

export const UserInTaskUncheckedCreateWithoutTagsInputObjectSchema = Schema;
