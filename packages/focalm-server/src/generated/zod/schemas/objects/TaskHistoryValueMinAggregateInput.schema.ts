import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskHistoryValueMinAggregateInputType> = z
  .object({
    groupId: z.literal(true).optional(),
    taskId: z.literal(true).optional(),
    key: z.literal(true).optional(),
  })
  .strict();

export const TaskHistoryValueMinAggregateInputObjectSchema = Schema;
