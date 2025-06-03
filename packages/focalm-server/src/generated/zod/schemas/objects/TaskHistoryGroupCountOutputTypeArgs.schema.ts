import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCountOutputTypeSelectObjectSchema } from './TaskHistoryGroupCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => TaskHistoryGroupCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupCountOutputTypeArgsObjectSchema = Schema;
