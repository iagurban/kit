import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskTagCreateWithoutUserInTaskInput> = z
  .object({
    tag: z.string(),
  })
  .strict();

export const UserInTaskTagCreateWithoutUserInTaskInputObjectSchema = Schema;
