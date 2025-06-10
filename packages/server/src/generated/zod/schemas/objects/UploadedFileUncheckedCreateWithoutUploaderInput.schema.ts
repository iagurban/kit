import { z } from 'zod';
import { ItemUncheckedCreateNestedManyWithoutImageInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutImageInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUncheckedCreateWithoutUploaderInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.dateStr().optional(),
    storedFileId: z.string(),
    menuId: z.string(),
    usingItems: z.lazy(() => ItemUncheckedCreateNestedManyWithoutImageInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema = Schema;
