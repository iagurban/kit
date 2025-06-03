import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagUncheckedCreateWithoutMenuInput> = z
  .object({
    id: z.string().optional(),
  })
  .strict();

export const TagUncheckedCreateWithoutMenuInputObjectSchema = Schema;
