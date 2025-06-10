import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskFindManySchema } from '../findManyTask.schema';
import { TaskHistoryValueFindManySchema } from '../findManyTaskHistoryValue.schema';
import { UserInTaskFindManySchema } from '../findManyUserInTask.schema';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { TaskCountOutputTypeArgsObjectSchema } from './TaskCountOutputTypeArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.TaskSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    state: z.boolean().optional(),
    archived: z.boolean().optional(),
    impact: z.boolean().optional(),
    ease: z.boolean().optional(),
    startAfterDate: z.boolean().optional(),
    startAfterOffset: z.boolean().optional(),
    plannedStartDate: z.boolean().optional(),
    plannedStartOffset: z.boolean().optional(),
    dueToDate: z.boolean().optional(),
    dueToOffset: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    authorId: z.boolean().optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    responsibleId: z.boolean().optional(),
    responsible: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    parentId: z.boolean().optional(),
    parent: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
    children: z.union([z.boolean(), z.lazy(() => TaskFindManySchema)]).optional(),
    orderKey: z.boolean().optional(),
    participants: z.union([z.boolean(), z.lazy(() => UserInTaskFindManySchema)]).optional(),
    historyValues: z.union([z.boolean(), z.lazy(() => TaskHistoryValueFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TaskCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const TaskSelectObjectSchema = Schema;
