import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { TaskUncheckedCreateNestedManyWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutResponsibleInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutUploaderInput.schema';
import { UserInTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserInTaskUncheckedCreateNestedManyWithoutUserInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuthoredTaskChangesInput> = z
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
    authoredTasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
    participatingTasks: z
      .lazy(() => UserInTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema = Schema;
