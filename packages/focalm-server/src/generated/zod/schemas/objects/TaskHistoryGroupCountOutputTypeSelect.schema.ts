import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCountOutputTypeSelect> = z
  .object({
    values: z.boolean().optional(),
  })
  .strict();

export const TaskHistoryGroupCountOutputTypeSelectObjectSchema = Schema;
