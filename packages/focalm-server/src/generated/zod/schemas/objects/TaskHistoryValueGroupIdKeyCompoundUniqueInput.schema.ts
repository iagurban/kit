import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueGroupIdKeyCompoundUniqueInput> = z
  .object({
    groupId: z.string(),
    key: z.lazy(() => TaskHistoryKeySchema),
  })
  .strict();

export const TaskHistoryValueGroupIdKeyCompoundUniqueInputObjectSchema = Schema;
