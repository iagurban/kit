import { z } from 'zod';
import { UserArgsObjectSchema } from './UserArgs.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    createdAt: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    hash: z.boolean().optional(),
  })
  .strict();

export const RefreshTokenSelectObjectSchema = Schema;
