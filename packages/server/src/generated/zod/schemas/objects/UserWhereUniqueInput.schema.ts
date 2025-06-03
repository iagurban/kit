import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
  })
  .strict();

export const UserWhereUniqueInputObjectSchema = Schema;
