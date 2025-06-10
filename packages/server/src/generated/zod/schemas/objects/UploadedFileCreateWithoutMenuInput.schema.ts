import { z } from 'zod';
import { UserCreateNestedOneWithoutUploadedFilesInputObjectSchema } from './UserCreateNestedOneWithoutUploadedFilesInput.schema';
import { StoredFileCreateNestedOneWithoutUploadsInputObjectSchema } from './StoredFileCreateNestedOneWithoutUploadsInput.schema';
import { ItemCreateNestedManyWithoutImageInputObjectSchema } from './ItemCreateNestedManyWithoutImageInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateWithoutMenuInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.dateStr().optional(),
    uploader: z.lazy(() => UserCreateNestedOneWithoutUploadedFilesInputObjectSchema),
    storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutUploadsInputObjectSchema),
    usingItems: z.lazy(() => ItemCreateNestedManyWithoutImageInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileCreateWithoutMenuInputObjectSchema = Schema;
