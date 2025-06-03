import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemUncheckedCreateNestedManyWithoutImageInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutImageInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    originalName: z.string(),
    mimetype: z.string(),
    uploadedAt: z.coerce.date().optional(),
    uploaderId: z.string(),
    storedFileId: z.string(),
    menuId: z.string(),
    usingItems: z.lazy(() => ItemUncheckedCreateNestedManyWithoutImageInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileUncheckedCreateInputObjectSchema = Schema;
