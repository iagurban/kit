import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskTagUncheckedCreateWithoutUserInTaskInput> = z
  .object({
    tag: z.string(),
  })
  .strict();

export const UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema = Schema;
