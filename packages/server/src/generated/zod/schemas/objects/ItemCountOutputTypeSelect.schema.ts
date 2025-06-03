import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCountOutputTypeSelect> = z
  .object({
    children: z.boolean().optional(),
  })
  .strict();

export const ItemCountOutputTypeSelectObjectSchema = Schema;
