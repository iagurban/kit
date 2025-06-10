import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { TaskHistoryGroupArgsObjectSchema } from './TaskHistoryGroupArgs.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueInclude> = z
  .object({
    group: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupArgsObjectSchema)]).optional(),
    task: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
  })
  .strict();

export const TaskHistoryValueIncludeObjectSchema = Schema;
