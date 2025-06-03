import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileCountOutputTypeSelectObjectSchema } from './StoredFileCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.StoredFileCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => StoredFileCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const StoredFileCountOutputTypeArgsObjectSchema = Schema;
