import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenCreateManyUserInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date(),
    hash: z.string(),
  })
  .strict();

export const RefreshTokenCreateManyUserInputObjectSchema = Schema;
