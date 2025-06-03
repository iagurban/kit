import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    menuId: z.literal(true).optional(),
  })
  .strict();

export const TagMaxAggregateInputObjectSchema = Schema;
