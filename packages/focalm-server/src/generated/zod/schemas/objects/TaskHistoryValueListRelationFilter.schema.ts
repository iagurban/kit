import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueWhereInputObjectSchema } from './TaskHistoryValueWhereInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueListRelationFilter> = z
  .object({
    every: z.lazy(() => TaskHistoryValueWhereInputObjectSchema).optional(),
    some: z.lazy(() => TaskHistoryValueWhereInputObjectSchema).optional(),
    none: z.lazy(() => TaskHistoryValueWhereInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueListRelationFilterObjectSchema = Schema;
