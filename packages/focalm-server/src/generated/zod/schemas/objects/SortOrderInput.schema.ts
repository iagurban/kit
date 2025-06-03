import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { NullsOrderSchema } from '../enums/NullsOrder.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const Schema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const SortOrderInputObjectSchema = Schema;
