import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueFindManySchema } from '../findManyTaskHistoryValue.schema';
import { TaskHistoryGroupCountOutputTypeArgsObjectSchema } from './TaskHistoryGroupCountOutputTypeArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupInclude> = z
  .object({
    values: z.union([z.boolean(), z.lazy(() => TaskHistoryValueFindManySchema)]).optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const TaskHistoryGroupIncludeObjectSchema = Schema;
