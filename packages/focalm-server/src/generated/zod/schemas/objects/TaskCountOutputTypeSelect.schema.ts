import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TaskCountOutputTypeSelect> = z
  .object({
    children: z.boolean().optional(),
    participants: z.boolean().optional(),
    historyValues: z.boolean().optional(),
  })
  .strict();

export const TaskCountOutputTypeSelectObjectSchema = Schema;
