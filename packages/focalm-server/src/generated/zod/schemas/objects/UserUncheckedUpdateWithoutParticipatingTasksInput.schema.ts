import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput.schema';
import { TaskUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskUncheckedUpdateManyWithoutAuthorNestedInput.schema';
import { TaskUncheckedUpdateManyWithoutResponsibleNestedInputObjectSchema } from './TaskUncheckedUpdateManyWithoutResponsibleNestedInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutUploaderNestedInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutParticipatingTasksInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    createdAt: z
      .union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    passwordHash: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
      .optional(),
    uploadedFiles: z
      .lazy(() => UploadedFileUncheckedUpdateManyWithoutUploaderNestedInputObjectSchema)
      .optional(),
    refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskUncheckedUpdateManyWithoutResponsibleNestedInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutParticipatingTasksInputObjectSchema = Schema;
