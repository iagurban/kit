import { z } from 'zod';
import { ItemCountOutputTypeSelectObjectSchema } from './ItemCountOutputTypeSelect.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => ItemCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const ItemCountOutputTypeArgsObjectSchema = Schema;
