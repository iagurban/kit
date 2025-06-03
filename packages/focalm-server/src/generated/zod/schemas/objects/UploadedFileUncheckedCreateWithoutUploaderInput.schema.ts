import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUncheckedCreateWithoutUploaderInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.date().optional(),
    storedFileId: z.string(),
  })
  .strict();

export const UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema = Schema;
