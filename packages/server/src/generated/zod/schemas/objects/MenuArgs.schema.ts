import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuIncludeObjectSchema } from './MenuInclude.schema';
import { MenuSelectObjectSchema } from './MenuSelect.schema';

const Schema: z.ZodType<Prisma.MenuArgs> = z
  .object({
    select: z.lazy(() => MenuSelectObjectSchema).optional(),
    include: z.lazy(() => MenuIncludeObjectSchema).optional(),
  })
  .strict();

export const MenuArgsObjectSchema = Schema;
