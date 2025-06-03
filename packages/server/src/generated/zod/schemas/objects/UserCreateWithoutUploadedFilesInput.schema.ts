import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateNestedManyWithoutOwnerInputObjectSchema } from './MenuCreateNestedManyWithoutOwnerInput.schema';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';

const Schema: z.ZodType<Prisma.UserCreateWithoutUploadedFilesInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    menus: z.lazy(() => MenuCreateNestedManyWithoutOwnerInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateWithoutUploadedFilesInputObjectSchema = Schema;
