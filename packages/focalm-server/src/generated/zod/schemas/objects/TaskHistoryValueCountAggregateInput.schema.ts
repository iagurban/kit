import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskHistoryValueCountAggregateInputType> = z
  .object({
    groupId: z.literal(true).optional(),
    taskId: z.literal(true).optional(),
    key: z.literal(true).optional(),
    value: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const TaskHistoryValueCountAggregateInputObjectSchema = Schema;
