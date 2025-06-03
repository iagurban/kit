import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { EnumTaskHistoryKeyFieldUpdateOperationsInputObjectSchema } from './EnumTaskHistoryKeyFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInputObjectSchema } from './TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput.schema';

const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema.nullable()), z.record(jsonSchema.nullable())])
);

const Schema: z.ZodType<Prisma.TaskHistoryValueUpdateInput> = z
  .object({
    taskId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    key: z
      .union([
        z.lazy(() => TaskHistoryKeySchema),
        z.lazy(() => EnumTaskHistoryKeyFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    value: z.union([z.lazy(() => JsonNullValueInputSchema), jsonSchema]).optional(),
    group: z.lazy(() => TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueUpdateInputObjectSchema = Schema;
