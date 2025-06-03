import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateNestedManyWithoutStoredFileInputObjectSchema } from './UploadedFileCreateNestedManyWithoutStoredFileInput.schema';

const Schema: z.ZodType<Prisma.StoredFileCreateInput> = z
  .object({
    id: z.string().optional(),
    hash: z.string(),
    size: z.number(),
    createdAt: z.coerce.date().optional(),
    uploads: z.lazy(() => UploadedFileCreateNestedManyWithoutStoredFileInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileCreateInputObjectSchema = Schema;
