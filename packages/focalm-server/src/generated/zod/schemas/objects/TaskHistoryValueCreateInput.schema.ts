import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { TaskHistoryGroupCreateNestedOneWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateNestedOneWithoutValuesInput.schema';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema.nullable()), z.record(jsonSchema.nullable())])
);

const Schema: z.ZodType<Prisma.TaskHistoryValueCreateInput> = z
  .object({
    taskId: z.string(),
    key: z.lazy(() => TaskHistoryKeySchema),
    value: z.union([z.lazy(() => JsonNullValueInputSchema), jsonSchema]),
    group: z.lazy(() => TaskHistoryGroupCreateNestedOneWithoutValuesInputObjectSchema),
  })
  .strict();

export const TaskHistoryValueCreateInputObjectSchema = Schema;
