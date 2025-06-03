import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileWhereInputObjectSchema } from './UploadedFileWhereInput.schema';

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
