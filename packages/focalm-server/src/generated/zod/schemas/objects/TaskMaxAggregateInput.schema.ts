import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    title: z.literal(true).optional(),
    state: z.literal(true).optional(),
    archived: z.literal(true).optional(),
    impact: z.literal(true).optional(),
    ease: z.literal(true).optional(),
    startAfterDate: z.literal(true).optional(),
    startAfterOffset: z.literal(true).optional(),
    plannedStartDate: z.literal(true).optional(),
    plannedStartOffset: z.literal(true).optional(),
    dueToDate: z.literal(true).optional(),
    dueToOffset: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
    responsibleId: z.literal(true).optional(),
    parentId: z.literal(true).optional(),
    orderKey: z.literal(true).optional(),
  })
  .strict();

export const TaskMaxAggregateInputObjectSchema = Schema;
