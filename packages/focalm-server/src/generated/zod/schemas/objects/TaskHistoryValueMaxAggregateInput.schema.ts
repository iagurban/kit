import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskHistoryValueMaxAggregateInputType> = z
  .object({
    groupId: z.literal(true).optional(),
    taskId: z.literal(true).optional(),
    key: z.literal(true).optional(),
    op: z.literal(true).optional(),
  })
  .strict();

export const TaskHistoryValueMaxAggregateInputObjectSchema = Schema;
