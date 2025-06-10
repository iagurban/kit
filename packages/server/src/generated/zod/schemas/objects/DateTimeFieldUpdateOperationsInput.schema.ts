import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z
  .object({
    set: z.coerce.dateStr().optional(),
  })
  .strict();

export const DateTimeFieldUpdateOperationsInputObjectSchema = Schema;
