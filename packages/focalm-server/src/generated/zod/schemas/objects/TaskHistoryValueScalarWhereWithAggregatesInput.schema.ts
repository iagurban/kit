import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { EnumTaskHistoryKeyWithAggregatesFilterObjectSchema } from './EnumTaskHistoryKeyWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    groupId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    key: z
      .union([
        z.lazy(() => EnumTaskHistoryKeyWithAggregatesFilterObjectSchema),
        z.lazy(() => TaskHistoryKeySchema),
      ])
      .optional(),
    value: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema = Schema;
