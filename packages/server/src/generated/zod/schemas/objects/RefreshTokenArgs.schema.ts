import { z } from 'zod';
import { RefreshTokenSelectObjectSchema } from './RefreshTokenSelect.schema';
import { RefreshTokenIncludeObjectSchema } from './RefreshTokenInclude.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenArgs> = z
  .object({
    select: z.lazy(() => RefreshTokenSelectObjectSchema).optional(),
    include: z.lazy(() => RefreshTokenIncludeObjectSchema).optional(),
  })
  .strict();

export const RefreshTokenArgsObjectSchema = Schema;
