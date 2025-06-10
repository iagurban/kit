import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { TaskCreateNestedManyWithoutParentInputObjectSchema } from './TaskCreateNestedManyWithoutParentInput.schema';
import { TaskCreateNestedOneWithoutChildrenInputObjectSchema } from './TaskCreateNestedOneWithoutChildrenInput.schema';
import { TaskHistoryValueCreateNestedManyWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateNestedManyWithoutTaskInput.schema';
import { UserCreateNestedOneWithoutAssignedTasksInputObjectSchema } from './UserCreateNestedOneWithoutAssignedTasksInput.schema';
import { UserCreateNestedOneWithoutAuthoredTasksInputObjectSchema } from './UserCreateNestedOneWithoutAuthoredTasksInput.schema';
import { UserInTaskCreateNestedManyWithoutTaskInputObjectSchema } from './UserInTaskCreateNestedManyWithoutTaskInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateInput> = z
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
    orderKey: z.string(),
    author: z.lazy(() => UserCreateNestedOneWithoutAuthoredTasksInputObjectSchema),
    responsible: z.lazy(() => UserCreateNestedOneWithoutAssignedTasksInputObjectSchema).optional(),
    parent: z.lazy(() => TaskCreateNestedOneWithoutChildrenInputObjectSchema).optional(),
    children: z.lazy(() => TaskCreateNestedManyWithoutParentInputObjectSchema).optional(),
    participants: z.lazy(() => UserInTaskCreateNestedManyWithoutTaskInputObjectSchema).optional(),
    historyValues: z.lazy(() => TaskHistoryValueCreateNestedManyWithoutTaskInputObjectSchema).optional(),
  })
  .strict();

export const TaskCreateInputObjectSchema = Schema;
