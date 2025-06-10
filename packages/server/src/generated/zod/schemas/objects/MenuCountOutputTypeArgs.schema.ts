import { z } from 'zod';
import { MenuCountOutputTypeSelectObjectSchema } from './MenuCountOutputTypeSelect.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => MenuCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const MenuCountOutputTypeArgsObjectSchema = Schema;
