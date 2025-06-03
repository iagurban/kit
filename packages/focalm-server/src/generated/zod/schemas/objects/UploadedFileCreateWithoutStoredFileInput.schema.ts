import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateNestedOneWithoutUploadedFilesInputObjectSchema } from './UserCreateNestedOneWithoutUploadedFilesInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateWithoutStoredFileInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.date().optional(),
    uploader: z.lazy(() => UserCreateNestedOneWithoutUploadedFilesInputObjectSchema),
  })
  .strict();

export const UploadedFileCreateWithoutStoredFileInputObjectSchema = Schema;
