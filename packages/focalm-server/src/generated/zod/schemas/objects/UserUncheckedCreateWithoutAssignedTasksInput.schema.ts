import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutUploaderInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutAssignedTasksInput> = z
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
    authoredTasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutAssignedTasksInputObjectSchema = Schema;
