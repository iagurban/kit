import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUncheckedCreateWithoutStoredFileInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.date().optional(),
    uploaderId: z.string(),
  })
  .strict();

export const UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema = Schema;
