import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskFindManySchema } from '../findManyTask.schema';
import { TaskHistoryGroupFindManySchema } from '../findManyTaskHistoryGroup.schema';
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
    startAfter: z.boolean().optional(),
    plannedStart: z.boolean().optional(),
    dueTo: z.boolean().optional(),
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
    historyGroups: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TaskCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const TaskSelectObjectSchema = Schema;
