import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileIncludeObjectSchema } from './StoredFileInclude.schema';
import { StoredFileSelectObjectSchema } from './StoredFileSelect.schema';

const Schema: z.ZodType<Prisma.StoredFileArgs> = z
  .object({
    select: z.lazy(() => StoredFileSelectObjectSchema).optional(),
    include: z.lazy(() => StoredFileIncludeObjectSchema).optional(),
  })
  .strict();

export const StoredFileArgsObjectSchema = Schema;
