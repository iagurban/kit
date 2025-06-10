import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskAvgAggregateInputType> = z
  .object({
    impact: z.literal(true).optional(),
    ease: z.literal(true).optional(),
    startAfterOffset: z.literal(true).optional(),
    plannedStartOffset: z.literal(true).optional(),
    dueToOffset: z.literal(true).optional(),
  })
  .strict();

export const TaskAvgAggregateInputObjectSchema = Schema;
