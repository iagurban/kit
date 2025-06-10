import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    createdAt: z.coerce.dateStr().optional(),
    expiresAt: z.coerce.dateStr(),
    hash: z.string(),
  })
  .strict();

export const RefreshTokenUncheckedCreateInputObjectSchema = Schema;
