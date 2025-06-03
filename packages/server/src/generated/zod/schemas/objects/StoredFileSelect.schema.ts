import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { StoredFileCountOutputTypeArgsObjectSchema } from './StoredFileCountOutputTypeArgs.schema';

const Schema: z.ZodType<Prisma.StoredFileSelect> = z
  .object({
    id: z.boolean().optional(),
    hash: z.boolean().optional(),
    size: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    uploads: z.union([z.boolean(), z.lazy(() => UploadedFileFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => StoredFileCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const StoredFileSelectObjectSchema = Schema;
