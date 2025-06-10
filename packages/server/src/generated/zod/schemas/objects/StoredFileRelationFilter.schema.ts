import { z } from 'zod';
import { StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileRelationFilter> = z
  .object({
    is: z
      .lazy(() => StoredFileWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => StoredFileWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const StoredFileRelationFilterObjectSchema = Schema;
