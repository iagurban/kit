import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput.schema';

const Schema: z.ZodType<Prisma.TaskUncheckedCreateWithoutChildrenInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    state: z.lazy(() => TaskStateSchema).optional(),
    archived: z.boolean().optional(),
    impact: z.number().optional(),
    ease: z.number().optional(),
    startAfter: z.coerce.date().optional().nullable(),
    plannedStart: z.coerce.date().optional().nullable(),
    dueTo: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    authorId: z.string(),
    responsibleId: z.string().optional().nullable(),
    parentId: z.string().optional().nullable(),
    orderKey: z.string(),
    historyGroups: z
      .lazy(() => TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInputObjectSchema)
      .optional(),
  })
  .strict();

export const TaskUncheckedCreateWithoutChildrenInputObjectSchema = Schema;
