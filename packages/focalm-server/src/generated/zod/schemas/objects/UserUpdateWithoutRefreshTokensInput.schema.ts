import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskHistoryGroupUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskHistoryGroupUpdateManyWithoutAuthorNestedInput.schema';
import { TaskUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskUpdateManyWithoutAuthorNestedInput.schema';
import { TaskUpdateManyWithoutResponsibleNestedInputObjectSchema } from './TaskUpdateManyWithoutResponsibleNestedInput.schema';
import { UploadedFileUpdateManyWithoutUploaderNestedInputObjectSchema } from './UploadedFileUpdateManyWithoutUploaderNestedInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateWithoutRefreshTokensInput> = z
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
    assignedTasks: z.lazy(() => TaskUpdateManyWithoutResponsibleNestedInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskUpdateManyWithoutAuthorNestedInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupUpdateManyWithoutAuthorNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUpdateWithoutRefreshTokensInputObjectSchema = Schema;
