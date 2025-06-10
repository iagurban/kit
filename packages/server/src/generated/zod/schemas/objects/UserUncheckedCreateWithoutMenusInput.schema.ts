import { z } from 'zod';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutUploaderInput.schema';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutMenusInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
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
