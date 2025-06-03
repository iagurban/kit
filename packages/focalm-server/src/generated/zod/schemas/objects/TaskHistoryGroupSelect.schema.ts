import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueFindManySchema } from '../findManyTaskHistoryValue.schema';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { TaskHistoryGroupCountOutputTypeArgsObjectSchema } from './TaskHistoryGroupCountOutputTypeArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupSelect> = z
  .object({
    id: z.boolean().optional(),
    taskId: z.boolean().optional(),
    task: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
    values: z.union([z.boolean(), z.lazy(() => TaskHistoryValueFindManySchema)]).optional(),
    authorId: z.boolean().optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    localCreatedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    createdAtFixReason: z.boolean().optional(),
    _count: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const TaskHistoryGroupSelectObjectSchema = Schema;
