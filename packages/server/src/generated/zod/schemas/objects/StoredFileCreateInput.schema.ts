import { z } from 'zod';
import { UploadedFileCreateNestedManyWithoutStoredFileInputObjectSchema } from './UploadedFileCreateNestedManyWithoutStoredFileInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileCreateInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    size: z.number(),
    createdAt: z.coerce.dateStr().optional(),
    uploads: z.lazy(() => UploadedFileCreateNestedManyWithoutStoredFileInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileCreateInputObjectSchema = Schema;
