import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';
import { TaskCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskCreateNestedManyWithoutAuthorInput.schema';
import { TaskCreateNestedManyWithoutResponsibleInputObjectSchema } from './TaskCreateNestedManyWithoutResponsibleInput.schema';
import { TaskHistoryGroupCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateNestedManyWithoutAuthorInput.schema';
import { UserInTaskCreateNestedManyWithoutUserInputObjectSchema } from './UserInTaskCreateNestedManyWithoutUserInput.schema';

const Schema: z.ZodType<Prisma.UserCreateWithoutUploadedFilesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskCreateNestedManyWithoutResponsibleInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
    participatingTasks: z.lazy(() => UserInTaskCreateNestedManyWithoutUserInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateWithoutUploadedFilesInputObjectSchema = Schema;
