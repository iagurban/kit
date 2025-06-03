import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskFindManySchema } from '../findManyTask.schema';
import { TaskHistoryGroupFindManySchema } from '../findManyTaskHistoryGroup.schema';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { TaskCountOutputTypeArgsObjectSchema } from './TaskCountOutputTypeArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.TaskInclude> = z
  .object({
    author: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    responsible: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    parent: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
    children: z.union([z.boolean(), z.lazy(() => TaskFindManySchema)]).optional(),
    historyGroups: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TaskCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const TaskIncludeObjectSchema = Schema;
