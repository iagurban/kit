import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupWhereInputObjectSchema } from './TaskHistoryGroupWhereInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupListRelationFilter> = z
  .object({
    every: z.lazy(() => TaskHistoryGroupWhereInputObjectSchema).optional(),
    some: z.lazy(() => TaskHistoryGroupWhereInputObjectSchema).optional(),
    none: z.lazy(() => TaskHistoryGroupWhereInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupListRelationFilterObjectSchema = Schema;
