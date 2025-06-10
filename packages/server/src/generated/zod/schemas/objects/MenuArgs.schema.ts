import { z } from 'zod';
import { MenuSelectObjectSchema } from './MenuSelect.schema';
import { MenuIncludeObjectSchema } from './MenuInclude.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuArgs> = z
  .object({
    select: z.lazy(() => MenuSelectObjectSchema).optional(),
    include: z.lazy(() => MenuIncludeObjectSchema).optional(),
  })
  .strict();

export const MenuArgsObjectSchema = Schema;
