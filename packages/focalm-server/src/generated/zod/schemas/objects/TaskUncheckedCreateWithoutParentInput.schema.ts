import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInput.schema';
import { TaskUncheckedCreateNestedManyWithoutParentInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutParentInput.schema';
import { UserInTaskUncheckedCreateNestedManyWithoutTaskInputObjectSchema } from './UserInTaskUncheckedCreateNestedManyWithoutTaskInput.schema';

const Schema: z.ZodType<Prisma.TaskUncheckedCreateWithoutParentInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    state: z.lazy(() => TaskStateSchema).optional(),
    archived: z.boolean().optional(),
    impact: z.number().optional(),
    ease: z.number().optional(),
    startAfterDate: z.coerce.date().optional().nullable(),
    startAfterOffset: z.number().optional().nullable(),
    plannedStartDate: z.coerce.date().optional().nullable(),
    plannedStartOffset: z.number().optional().nullable(),
    dueToDate: z.coerce.date().optional().nullable(),
    dueToOffset: z.number().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    authorId: z.string(),
    responsibleId: z.string().optional().nullable(),
    orderKey: z.string(),
    children: z.lazy(() => TaskUncheckedCreateNestedManyWithoutParentInputObjectSchema).optional(),
    participants: z.lazy(() => UserInTaskUncheckedCreateNestedManyWithoutTaskInputObjectSchema).optional(),
    historyValues: z
      .lazy(() => TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInputObjectSchema)
      .optional(),
  })
  .strict();

export const TaskUncheckedCreateWithoutParentInputObjectSchema = Schema;
