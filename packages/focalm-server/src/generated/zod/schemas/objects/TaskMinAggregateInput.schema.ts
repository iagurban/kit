import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    title: z.literal(true).optional(),
    state: z.literal(true).optional(),
    archived: z.literal(true).optional(),
    impact: z.literal(true).optional(),
    ease: z.literal(true).optional(),
    startAfter: z.literal(true).optional(),
    plannedStart: z.literal(true).optional(),
    dueTo: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    authorId: z.literal(true).optional(),
    responsibleId: z.literal(true).optional(),
    parentId: z.literal(true).optional(),
    orderKey: z.literal(true).optional(),
  })
  .strict();

export const TaskMinAggregateInputObjectSchema = Schema;
