import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { NestedBoolFilterObjectSchema } from './NestedBoolFilter.schema';

const Schema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterObjectSchema)]).optional(),
  })
  .strict();

export const BoolFilterObjectSchema = Schema;
