import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCountOutputTypeSelectObjectSchema } from './TaskCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.TaskCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => TaskCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const TaskCountOutputTypeArgsObjectSchema = Schema;
