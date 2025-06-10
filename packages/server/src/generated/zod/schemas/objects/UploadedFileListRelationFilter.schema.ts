import { z } from 'zod';
import { UploadedFileWhereInputObjectSchema } from './UploadedFileWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileListRelationFilter> = z
  .object({
    every: z.lazy(() => UploadedFileWhereInputObjectSchema).optional(),
    some: z.lazy(() => UploadedFileWhereInputObjectSchema).optional(),
    none: z.lazy(() => UploadedFileWhereInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileListRelationFilterObjectSchema = Schema;
