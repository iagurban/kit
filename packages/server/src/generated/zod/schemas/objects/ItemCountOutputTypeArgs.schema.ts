import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCountOutputTypeSelectObjectSchema } from './ItemCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.ItemCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => ItemCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const ItemCountOutputTypeArgsObjectSchema = Schema;
