import { z } from 'zod';
import { StoredFileSelectObjectSchema } from './StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema } from './StoredFileInclude.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileArgs> = z
  .object({
    select: z.lazy(() => StoredFileSelectObjectSchema).optional(),
    include: z.lazy(() => StoredFileIncludeObjectSchema).optional(),
  })
  .strict();

export const StoredFileArgsObjectSchema = Schema;
