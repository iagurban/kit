import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EnumTaskStateFieldUpdateOperationsInputObjectSchema } from './EnumTaskStateFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskHistoryValueUpdateManyWithoutTaskNestedInputObjectSchema } from './TaskHistoryValueUpdateManyWithoutTaskNestedInput.schema';
import { TaskUpdateManyWithoutParentNestedInputObjectSchema } from './TaskUpdateManyWithoutParentNestedInput.schema';
import { TaskUpdateOneWithoutChildrenNestedInputObjectSchema } from './TaskUpdateOneWithoutChildrenNestedInput.schema';
import { UserInTaskUpdateManyWithoutTaskNestedInputObjectSchema } from './UserInTaskUpdateManyWithoutTaskNestedInput.schema';
import { UserUpdateOneRequiredWithoutAuthoredTasksNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutAuthoredTasksNestedInput.schema';
import { UserUpdateOneWithoutAssignedTasksNestedInputObjectSchema } from './UserUpdateOneWithoutAssignedTasksNestedInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    state: z
      .union([
        z.lazy(() => TaskStateSchema),
        z.lazy(() => EnumTaskStateFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    archived: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
    impact: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
    ease: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
    startAfterDate: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    startAfterOffset: z
      .union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    plannedStartDate: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    plannedStartOffset: z
      .union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    dueToDate: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    dueToOffset: z
      .union([z.number(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    updatedAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    orderKey: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    author: z.lazy(() => UserUpdateOneRequiredWithoutAuthoredTasksNestedInputObjectSchema).optional(),
    responsible: z.lazy(() => UserUpdateOneWithoutAssignedTasksNestedInputObjectSchema).optional(),
    parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputObjectSchema).optional(),
    children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputObjectSchema).optional(),
    participants: z.lazy(() => UserInTaskUpdateManyWithoutTaskNestedInputObjectSchema).optional(),
    historyValues: z.lazy(() => TaskHistoryValueUpdateManyWithoutTaskNestedInputObjectSchema).optional(),
  })
  .strict();

export const TaskUpdateInputObjectSchema = Schema;
