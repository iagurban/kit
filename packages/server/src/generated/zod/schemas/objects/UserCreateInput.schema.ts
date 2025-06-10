import { z } from 'zod';
import { MenuCreateNestedManyWithoutOwnerInputObjectSchema } from './MenuCreateNestedManyWithoutOwnerInput.schema';
import { UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileCreateNestedManyWithoutUploaderInput.schema';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    menus: z.lazy(() => MenuCreateNestedManyWithoutOwnerInputObjectSchema).optional(),
    uploadedFiles: z.lazy(() => UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateInputObjectSchema = Schema;
