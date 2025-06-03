import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    menuId: z.string(),
  })
  .strict();

export const TagUncheckedCreateInputObjectSchema = Schema;
