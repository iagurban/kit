import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.RefreshTokenInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  })
  .strict();

export const RefreshTokenIncludeObjectSchema = Schema;
