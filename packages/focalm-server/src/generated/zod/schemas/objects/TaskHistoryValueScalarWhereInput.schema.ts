import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';
import { EnumTaskHistoryKeyFilterObjectSchema } from './EnumTaskHistoryKeyFilter.schema';
import { EnumTaskHistoryOperationFilterObjectSchema } from './EnumTaskHistoryOperationFilter.schema';
import { JsonFilterObjectSchema } from './JsonFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema),
        z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskHistoryValueScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema),
        z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    groupId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    key: z
      .union([z.lazy(() => EnumTaskHistoryKeyFilterObjectSchema), z.lazy(() => TaskHistoryKeySchema)])
      .optional(),
    op: z
      .union([
        z.lazy(() => EnumTaskHistoryOperationFilterObjectSchema),
        z.lazy(() => TaskHistoryOperationSchema),
      ])
      .optional(),
    value: z.lazy(() => JsonFilterObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueScalarWhereInputObjectSchema = Schema;
