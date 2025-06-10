import { z } from 'zod';
import { StoredFileCountOutputTypeSelectObjectSchema } from './StoredFileCountOutputTypeSelect.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => StoredFileCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const StoredFileCountOutputTypeArgsObjectSchema = Schema;
