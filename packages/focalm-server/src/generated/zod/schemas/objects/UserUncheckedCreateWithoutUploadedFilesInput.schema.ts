import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutAuthorInput.schema';
import { TaskUncheckedCreateNestedManyWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateNestedManyWithoutResponsibleInput.schema';
import { UserInTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserInTaskUncheckedCreateNestedManyWithoutUserInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutUploadedFilesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutResponsibleInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
    authoredTaskChanges: z
      .lazy(() => TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
    participatingTasks: z
      .lazy(() => UserInTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutUploadedFilesInputObjectSchema = Schema;
