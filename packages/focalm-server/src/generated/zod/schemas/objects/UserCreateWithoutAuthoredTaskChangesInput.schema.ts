import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';
import { TaskCreateNestedManyWithoutAuthorInputObjectSchema } from './TaskCreateNestedManyWithoutAuthorInput.schema';
import { TaskCreateNestedManyWithoutResponsibleInputObjectSchema } from './TaskCreateNestedManyWithoutResponsibleInput.schema';
import { UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileCreateNestedManyWithoutUploaderInput.schema';

const Schema: z.ZodType<Prisma.UserCreateWithoutAuthoredTaskChangesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    uploadedFiles: z.lazy(() => UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskCreateNestedManyWithoutResponsibleInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskCreateNestedManyWithoutAuthorInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateWithoutAuthoredTaskChangesInputObjectSchema = Schema;
