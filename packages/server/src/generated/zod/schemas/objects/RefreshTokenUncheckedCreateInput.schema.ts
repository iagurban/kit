import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date(),
    hash: z.string(),
  })
  .strict();

export const RefreshTokenUncheckedCreateInputObjectSchema = Schema;
