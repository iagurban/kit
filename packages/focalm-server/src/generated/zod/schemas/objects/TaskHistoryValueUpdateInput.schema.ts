import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';
import { EnumTaskHistoryKeyFieldUpdateOperationsInputObjectSchema } from './EnumTaskHistoryKeyFieldUpdateOperationsInput.schema';
import { EnumTaskHistoryOperationFieldUpdateOperationsInputObjectSchema } from './EnumTaskHistoryOperationFieldUpdateOperationsInput.schema';
import { TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInputObjectSchema } from './TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput.schema';
import { TaskUpdateOneRequiredWithoutHistoryValuesNestedInputObjectSchema } from './TaskUpdateOneRequiredWithoutHistoryValuesNestedInput.schema';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema.nullable()), z.record(jsonSchema.nullable())])
);

const Schema: z.ZodType<Prisma.TaskHistoryValueUpdateInput> = z
  .object({
    key: z
      .union([
        z.lazy(() => TaskHistoryKeySchema),
        z.lazy(() => EnumTaskHistoryKeyFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    op: z
      .union([
        z.lazy(() => TaskHistoryOperationSchema),
        z.lazy(() => EnumTaskHistoryOperationFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    value: z.union([z.lazy(() => JsonNullValueInputSchema), jsonSchema]).optional(),
    group: z.lazy(() => TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInputObjectSchema).optional(),
    task: z.lazy(() => TaskUpdateOneRequiredWithoutHistoryValuesNestedInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueUpdateInputObjectSchema = Schema;
