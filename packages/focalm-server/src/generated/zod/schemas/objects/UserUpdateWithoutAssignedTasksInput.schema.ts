import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUpdateManyWithoutUserNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskHistoryGroupUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskHistoryGroupUpdateManyWithoutAuthorNestedInput.schema';
import { TaskUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskUpdateManyWithoutAuthorNestedInput.schema';
import { UploadedFileUpdateManyWithoutUploaderNestedInputObjectSchema } from './UploadedFileUpdateManyWithoutUploaderNestedInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateWithoutAssignedTasksInput> = z
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
    uploadedFiles: z.lazy(() => UploadedFileUpdateManyWithoutUploaderNestedInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskUpdateManyWithoutAuthorNestedInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupUpdateManyWithoutAuthorNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUpdateWithoutAssignedTasksInputObjectSchema = Schema;
