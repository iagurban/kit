import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutUserNestedInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { TaskUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema } from './TaskUncheckedUpdateManyWithoutAuthorNestedInput.schema';
import { TaskUncheckedUpdateManyWithoutResponsibleNestedInputObjectSchema } from './TaskUncheckedUpdateManyWithoutResponsibleNestedInput.schema';
import { UploadedFileUncheckedUpdateManyWithoutUploaderNestedInputObjectSchema } from './UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput.schema';
import { UserInTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './UserInTaskUncheckedUpdateManyWithoutUserNestedInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuthoredTaskChangesInput> = z
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
    participatingTasks: z
      .lazy(() => UserInTaskUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedUpdateWithoutAuthoredTaskChangesInputObjectSchema = Schema;
