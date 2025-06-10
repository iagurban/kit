import { z } from 'zod';
import { StoredFileCreateNestedOneWithoutUploadsInputObjectSchema } from './StoredFileCreateNestedOneWithoutUploadsInput.schema';
import { MenuCreateNestedOneWithoutFilesInputObjectSchema } from './MenuCreateNestedOneWithoutFilesInput.schema';
import { ItemCreateNestedManyWithoutImageInputObjectSchema } from './ItemCreateNestedManyWithoutImageInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateWithoutUploaderInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.dateStr().optional(),
    storedFile: z.lazy(() => StoredFileCreateNestedOneWithoutUploadsInputObjectSchema),
    menu: z.lazy(() => MenuCreateNestedOneWithoutFilesInputObjectSchema),
    usingItems: z.lazy(() => ItemCreateNestedManyWithoutImageInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileCreateWithoutUploaderInputObjectSchema = Schema;
