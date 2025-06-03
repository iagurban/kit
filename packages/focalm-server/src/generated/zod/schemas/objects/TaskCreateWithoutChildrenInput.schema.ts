import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { TaskCreateNestedOneWithoutChildrenInputObjectSchema } from './TaskCreateNestedOneWithoutChildrenInput.schema';
import { TaskHistoryGroupCreateNestedManyWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateNestedManyWithoutTaskInput.schema';
import { UserCreateNestedOneWithoutAssignedTasksInputObjectSchema } from './UserCreateNestedOneWithoutAssignedTasksInput.schema';
import { UserCreateNestedOneWithoutAuthoredTasksInputObjectSchema } from './UserCreateNestedOneWithoutAuthoredTasksInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateWithoutChildrenInput> = z
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
    orderKey: z.string(),
    author: z.lazy(() => UserCreateNestedOneWithoutAuthoredTasksInputObjectSchema),
    responsible: z.lazy(() => UserCreateNestedOneWithoutAssignedTasksInputObjectSchema).optional(),
    parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputObjectSchema).optional(),
    historyGroups: z.lazy(() => TaskHistoryGroupCreateNestedManyWithoutTaskInputObjectSchema).optional(),
  })
  .strict();

export const TaskCreateWithoutChildrenInputObjectSchema = Schema;
