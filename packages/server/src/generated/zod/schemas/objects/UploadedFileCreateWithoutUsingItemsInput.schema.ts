import { z } from 'zod';
import { UserCreateNestedOneWithoutUploadedFilesInputObjectSchema } from './UserCreateNestedOneWithoutUploadedFilesInput.schema';
import { StoredFileCreateNestedOneWithoutUploadsInputObjectSchema } from './StoredFileCreateNestedOneWithoutUploadsInput.schema';
import { MenuCreateNestedOneWithoutFilesInputObjectSchema } from './MenuCreateNestedOneWithoutFilesInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateWithoutUsingItemsInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.dateStr().optional(),
    uploader: z.lazy(() => UserCreateNestedOneWithoutUploadedFilesInputObjectSchema),
    storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutUploadsInputObjectSchema),
    menu: z.lazy(() => MenuCreateNestedOneWithoutFilesInputObjectSchema),
  })
  .strict();

export const UploadedFileCreateWithoutUsingItemsInputObjectSchema = Schema;
