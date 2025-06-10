import { z } from 'zod';
import { MenuCreateNestedManyWithoutOwnerInputObjectSchema } from './MenuCreateNestedManyWithoutOwnerInput.schema';
import { UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileCreateNestedManyWithoutUploaderInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    menus: z.lazy(() => MenuCreateNestedManyWithoutOwnerInputObjectSchema).optional(),
    uploadedFiles: z.lazy(() => UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateWithoutRefreshTokensInputObjectSchema = Schema;
