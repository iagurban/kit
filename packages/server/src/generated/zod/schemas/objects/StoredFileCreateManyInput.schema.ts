import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileCreateManyInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    size: z.number(),
    createdAt: z.coerce.dateStr().optional(),
  })
  .strict();

export const StoredFileCreateManyInputObjectSchema = Schema;
