import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { EnumTaskHistoryKeyFilterObjectSchema } from './EnumTaskHistoryKeyFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { TaskHistoryGroupRelationFilterObjectSchema } from './TaskHistoryGroupRelationFilter.schema';
import { TaskHistoryGroupWhereInputObjectSchema } from './TaskHistoryGroupWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskHistoryValueWhereInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskHistoryValueWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskHistoryValueWhereInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereInputObjectSchema).array(),
      ])
      .optional(),
    groupId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    key: z
      .union([z.lazy(() => EnumTaskHistoryKeyFilterObjectSchema), z.lazy(() => TaskHistoryKeySchema)])
      .optional(),
    value: z.lazy(() => JsonFilterObjectSchema).optional(),
    group: z
      .union([
        z.lazy(() => TaskHistoryGroupRelationFilterObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryValueWhereInputObjectSchema = Schema;
