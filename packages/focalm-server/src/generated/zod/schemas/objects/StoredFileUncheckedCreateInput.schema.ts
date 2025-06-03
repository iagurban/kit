import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileUncheckedCreateNestedManyWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutStoredFileInput.schema';

const Schema: z.ZodType<Prisma.StoredFileUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    size: z.number(),
    createdAt: z.coerce.date().optional(),
    uploads: z.lazy(() => UploadedFileUncheckedCreateNestedManyWithoutStoredFileInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileUncheckedCreateInputObjectSchema = Schema;
