import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateManyStoredFileInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.dateStr().optional(),
    uploaderId: z.string(),
    menuId: z.string(),
  })
  .strict();

export const UploadedFileCreateManyStoredFileInputObjectSchema = Schema;
