import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateManyOwnerInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    title: z.string(),
  })
  .strict();

export const MenuCreateManyOwnerInputObjectSchema = Schema;
