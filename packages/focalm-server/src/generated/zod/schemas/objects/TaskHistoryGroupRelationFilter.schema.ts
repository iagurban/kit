import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupWhereInputObjectSchema } from './TaskHistoryGroupWhereInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupRelationFilter> = z
  .object({
    is: z
      .lazy(() => TaskHistoryGroupWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => TaskHistoryGroupWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const TaskHistoryGroupRelationFilterObjectSchema = Schema;
