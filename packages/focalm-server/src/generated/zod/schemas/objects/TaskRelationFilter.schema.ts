import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskWhereInputObjectSchema } from './TaskWhereInput.schema';

const Schema: z.ZodType<Prisma.TaskRelationFilter> = z
  .object({
    is: z
      .lazy(() => TaskWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => TaskWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const TaskRelationFilterObjectSchema = Schema;
