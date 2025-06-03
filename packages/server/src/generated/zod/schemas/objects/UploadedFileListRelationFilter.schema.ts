import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileWhereInputObjectSchema } from './UploadedFileWhereInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileListRelationFilter> = z
  .object({
    every: z.lazy(() => UploadedFileWhereInputObjectSchema).optional(),
    some: z.lazy(() => UploadedFileWhereInputObjectSchema).optional(),
    none: z.lazy(() => UploadedFileWhereInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileListRelationFilterObjectSchema = Schema;
