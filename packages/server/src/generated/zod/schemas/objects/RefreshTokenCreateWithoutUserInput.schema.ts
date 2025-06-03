import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenCreateWithoutUserInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date(),
    hash: z.string(),
  })
  .strict();

export const RefreshTokenCreateWithoutUserInputObjectSchema = Schema;
