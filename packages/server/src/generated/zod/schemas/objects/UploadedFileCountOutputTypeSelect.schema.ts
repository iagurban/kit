import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCountOutputTypeSelect> = z
  .object({
    usingItems: z.boolean().optional(),
  })
  .strict();

export const UploadedFileCountOutputTypeSelectObjectSchema = Schema;
