import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemIncludeObjectSchema } from './ItemInclude.schema';
import { ItemSelectObjectSchema } from './ItemSelect.schema';

const Schema: z.ZodType<Prisma.ItemArgs> = z
  .object({
    select: z.lazy(() => ItemSelectObjectSchema).optional(),
    include: z.lazy(() => ItemIncludeObjectSchema).optional(),
  })
  .strict();

export const ItemArgsObjectSchema = Schema;
