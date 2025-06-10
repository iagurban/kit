import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskTagUncheckedCreateInput> = z
  .object({
    userInTaskId: z.string(),
    tag: z.string(),
  })
  .strict();

export const UserInTaskTagUncheckedCreateInputObjectSchema = Schema;
