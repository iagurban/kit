import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EnumTaskStateFieldUpdateOperationsInputObjectSchema } from './EnumTaskStateFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskHistoryGroupUpdateManyWithoutTaskNestedInputObjectSchema } from './TaskHistoryGroupUpdateManyWithoutTaskNestedInput.schema';
import { TaskUpdateManyWithoutParentNestedInputObjectSchema } from './TaskUpdateManyWithoutParentNestedInput.schema';
import { TaskUpdateOneWithoutChildrenNestedInputObjectSchema } from './TaskUpdateOneWithoutChildrenNestedInput.schema';
import { UserUpdateOneWithoutAssignedTasksNestedInputObjectSchema } from './UserUpdateOneWithoutAssignedTasksNestedInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateWithoutAuthorInput> = z
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
    startAfter: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    plannedStart: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    dueTo: z
      .union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    updatedAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    orderKey: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    responsible: z.lazy(() => UserUpdateOneWithoutAssignedTasksNestedInputObjectSchema).optional(),
    parent: z.lazy(() => TaskUpdateOneWithoutChildrenNestedInputObjectSchema).optional(),
    children: z.lazy(() => TaskUpdateManyWithoutParentNestedInputObjectSchema).optional(),
    historyGroups: z.lazy(() => TaskHistoryGroupUpdateManyWithoutTaskNestedInputObjectSchema).optional(),
  })
  .strict();

export const TaskUpdateWithoutAuthorInputObjectSchema = Schema;
