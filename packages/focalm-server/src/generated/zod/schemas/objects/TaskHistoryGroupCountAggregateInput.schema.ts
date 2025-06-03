import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    taskId: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
    localCreatedAt: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    createdAtFixReason: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const TaskHistoryGroupCountAggregateInputObjectSchema = Schema;
