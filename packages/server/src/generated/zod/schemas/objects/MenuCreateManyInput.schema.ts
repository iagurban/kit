import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateManyInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    title: z.string(),
    ownerId: z.string(),
  })
  .strict();

export const MenuCreateManyInputObjectSchema = Schema;
