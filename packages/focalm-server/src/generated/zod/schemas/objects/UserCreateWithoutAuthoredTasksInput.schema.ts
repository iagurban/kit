import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';
import { TaskCreateNestedManyWithoutResponsibleInputObjectSchema } from './TaskCreateNestedManyWithoutResponsibleInput.schema';
import { TaskHistoryGroupCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateNestedManyWithoutAuthorInput.schema';
import { UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileCreateNestedManyWithoutUploaderInput.schema';

const Schema: z.ZodType<Prisma.UserCreateWithoutAuthoredTasksInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    uploadedFiles: z.lazy(() => UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskCreateNestedManyWithoutResponsibleInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateWithoutAuthoredTasksInputObjectSchema = Schema;
