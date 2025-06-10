import { z } from 'zod';
import { UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileCreateNestedManyWithoutUploaderInput.schema';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserCreateWithoutMenusInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    uploadedFiles: z.lazy(() => UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateWithoutMenusInputObjectSchema = Schema;
