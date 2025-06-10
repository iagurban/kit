import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { TaskHistoryGroupArgsObjectSchema } from './TaskHistoryGroupArgs.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueSelect> = z
  .object({
    groupId: z.boolean().optional(),
    group: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupArgsObjectSchema)]).optional(),
    taskId: z.boolean().optional(),
    task: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
    key: z.boolean().optional(),
    op: z.boolean().optional(),
    value: z.boolean().optional(),
  })
  .strict();

export const TaskHistoryValueSelectObjectSchema = Schema;
