import { z } from 'zod';
import { UploadedFileWhereInputObjectSchema } from './UploadedFileWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileRelationFilter> = z
  .object({
    is: z
      .lazy(() => UploadedFileWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => UploadedFileWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const UploadedFileRelationFilterObjectSchema = Schema;
