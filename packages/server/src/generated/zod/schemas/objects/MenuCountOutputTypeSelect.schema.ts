import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCountOutputTypeSelect> = z
  .object({
    items: z.boolean().optional(),
    tags: z.boolean().optional(),
    files: z.boolean().optional(),
  })
  .strict();

export const MenuCountOutputTypeSelectObjectSchema = Schema;
