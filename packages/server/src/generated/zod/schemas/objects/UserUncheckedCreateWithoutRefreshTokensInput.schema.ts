import { z } from 'zod';
import { MenuUncheckedCreateNestedManyWithoutOwnerInputObjectSchema } from './MenuUncheckedCreateNestedManyWithoutOwnerInput.schema';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateNestedManyWithoutUploaderInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    email: z.string(),
    name: z.string(),
    passwordHash: z.string(),
    menus: z.lazy(() => MenuUncheckedCreateNestedManyWithoutOwnerInputObjectSchema).optional(),
    uploadedFiles: z
      .lazy(() => UploadedFileUncheckedCreateNestedManyWithoutUploaderInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutRefreshTokensInputObjectSchema = Schema;
