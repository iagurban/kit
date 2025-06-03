import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { TaskUncheckedCreateNestedManyWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutResponsibleInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutUploaderInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthoredTasksInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    uploadedFiles: z
      .lazy(() => UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema)
      .optional(),
    refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutResponsibleInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema = Schema;
