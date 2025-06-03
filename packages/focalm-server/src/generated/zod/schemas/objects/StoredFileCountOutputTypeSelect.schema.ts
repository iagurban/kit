import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileCountOutputTypeSelect> = z
  .object({
    uploads: z.boolean().optional(),
  })
  .strict();

export const StoredFileCountOutputTypeSelectObjectSchema = Schema;
