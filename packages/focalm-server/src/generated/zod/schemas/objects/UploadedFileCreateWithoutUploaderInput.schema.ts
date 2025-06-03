import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileCreateNestedOneWithoutUploadsInputObjectSchema } from './StoredFileCreateNestedOneWithoutUploadsInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateWithoutUploaderInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.date().optional(),
    storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutUploadsInputObjectSchema),
  })
  .strict();

export const UploadedFileCreateWithoutUploaderInputObjectSchema = Schema;
