import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInTaskCountOutputTypeSelect> = z
  .object({
    tags: z.boolean().optional(),
  })
  .strict();

export const UserInTaskCountOutputTypeSelectObjectSchema = Schema;
