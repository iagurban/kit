import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutUploaderInput.schema';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutMenusInput> = z
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
  })
  .strict();

export const UserUncheckedCreateWithoutMenusInputObjectSchema = Schema;
