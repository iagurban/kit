import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema.nullable()), z.record(jsonSchema.nullable())])
);

const Schema: z.ZodType<Prisma.TaskHistoryValueUncheckedCreateInput> = z
  .object({
    groupId: z.string(),
    taskId: z.string(),
    key: z.lazy(() => TaskHistoryKeySchema),
    op: z.lazy(() => TaskHistoryOperationSchema).optional(),
    value: z.union([z.lazy(() => JsonNullValueInputSchema), jsonSchema]),
  })
  .strict();

export const TaskHistoryValueUncheckedCreateInputObjectSchema = Schema;
