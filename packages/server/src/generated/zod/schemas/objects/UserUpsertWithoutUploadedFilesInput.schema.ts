import { z } from 'zod';
import { UserUpdateWithoutUploadedFilesInputObjectSchema } from './UserUpdateWithoutUploadedFilesInput.schema';
import { UserUncheckedUpdateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedUpdateWithoutUploadedFilesInput.schema';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutUploadedFilesInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutUploadedFilesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutUploadedFilesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutUploadedFilesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutUploadedFilesInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutUploadedFilesInputObjectSchema = Schema;
