import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenIncludeObjectSchema } from './RefreshTokenInclude.schema';
import { RefreshTokenSelectObjectSchema } from './RefreshTokenSelect.schema';

const Schema: z.ZodType<Prisma.RefreshTokenArgs> = z
  .object({
    select: z.lazy(() => RefreshTokenSelectObjectSchema).optional(),
    include: z.lazy(() => RefreshTokenIncludeObjectSchema).optional(),
  })
  .strict();

export const RefreshTokenArgsObjectSchema = Schema;
