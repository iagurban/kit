import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskSumAggregateInputType> = z
  .object({
    impact: z.literal(true).optional(),
    ease: z.literal(true).optional(),
  })
  .strict();

export const TaskSumAggregateInputObjectSchema = Schema;
