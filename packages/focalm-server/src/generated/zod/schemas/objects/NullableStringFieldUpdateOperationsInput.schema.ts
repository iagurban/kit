import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z
  .object({
    set: z.string().optional().nullable(),
  })
  .strict();

export const NullableStringFieldUpdateOperationsInputObjectSchema = Schema;
