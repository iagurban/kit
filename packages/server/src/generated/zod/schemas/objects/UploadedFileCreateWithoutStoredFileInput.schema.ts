import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateNestedManyWithoutImageInputObjectSchema } from './ItemCreateNestedManyWithoutImageInput.schema';
import { MenuCreateNestedOneWithoutFilesInputObjectSchema } from './MenuCreateNestedOneWithoutFilesInput.schema';
import { UserCreateNestedOneWithoutUploadedFilesInputObjectSchema } from './UserCreateNestedOneWithoutUploadedFilesInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateWithoutStoredFileInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.date().optional(),
    uploader: z.lazy(() => UserCreateNestedOneWithoutUploadedFilesInputObjectSchema),
    menu: z.lazy(() => MenuCreateNestedOneWithoutFilesInputObjectSchema),
    usingItems: z.lazy(() => ItemCreateNestedManyWithoutImageInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileCreateWithoutStoredFileInputObjectSchema = Schema;
