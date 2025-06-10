import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskTagCreateManyInput> = z
  .object({
    userInTaskId: z.string(),
    tag: z.string(),
  })
  .strict();

export const UserInTaskTagCreateManyInputObjectSchema = Schema;
