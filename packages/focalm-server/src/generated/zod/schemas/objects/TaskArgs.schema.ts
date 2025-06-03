import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskIncludeObjectSchema } from './TaskInclude.schema';
import { TaskSelectObjectSchema } from './TaskSelect.schema';

const Schema: z.ZodType<Prisma.TaskArgs> = z
  .object({
    select: z.lazy(() => TaskSelectObjectSchema).optional(),
    include: z.lazy(() => TaskIncludeObjectSchema).optional(),
  })
  .strict();

export const TaskArgsObjectSchema = Schema;
