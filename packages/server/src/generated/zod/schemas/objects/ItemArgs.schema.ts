import { z } from 'zod';
import { ItemSelectObjectSchema } from './ItemSelect.schema';
import { ItemIncludeObjectSchema } from './ItemInclude.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemArgs> = z
  .object({
    select: z.lazy(() => ItemSelectObjectSchema).optional(),
    include: z.lazy(() => ItemIncludeObjectSchema).optional(),
  })
  .strict();

export const ItemArgsObjectSchema = Schema;
