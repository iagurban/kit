import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileUncheckedCreateWithoutUploadsInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    size: z.number(),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const StoredFileUncheckedCreateWithoutUploadsInputObjectSchema = Schema;
