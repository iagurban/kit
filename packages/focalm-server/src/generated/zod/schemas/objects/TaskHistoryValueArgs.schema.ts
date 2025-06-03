import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueIncludeObjectSchema } from './TaskHistoryValueInclude.schema';
import { TaskHistoryValueSelectObjectSchema } from './TaskHistoryValueSelect.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueArgs> = z
  .object({
    select: z.lazy(() => TaskHistoryValueSelectObjectSchema).optional(),
    include: z.lazy(() => TaskHistoryValueIncludeObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueArgsObjectSchema = Schema;
