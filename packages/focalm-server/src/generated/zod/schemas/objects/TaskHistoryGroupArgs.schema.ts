import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupIncludeObjectSchema } from './TaskHistoryGroupInclude.schema';
import { TaskHistoryGroupSelectObjectSchema } from './TaskHistoryGroupSelect.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupArgs> = z
  .object({
    select: z.lazy(() => TaskHistoryGroupSelectObjectSchema).optional(),
    include: z.lazy(() => TaskHistoryGroupIncludeObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupArgsObjectSchema = Schema;
