import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCountOutputTypeSelectObjectSchema } from './MenuCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.MenuCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => MenuCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const MenuCountOutputTypeArgsObjectSchema = Schema;
