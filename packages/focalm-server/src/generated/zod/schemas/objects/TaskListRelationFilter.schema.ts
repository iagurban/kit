import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskWhereInputObjectSchema } from './TaskWhereInput.schema';

const Schema: z.ZodType<Prisma.TaskListRelationFilter> = z
  .object({
    every: z.lazy(() => TaskWhereInputObjectSchema).optional(),
    some: z.lazy(() => TaskWhereInputObjectSchema).optional(),
    none: z.lazy(() => TaskWhereInputObjectSchema).optional(),
  })
  .strict();

export const TaskListRelationFilterObjectSchema = Schema;
