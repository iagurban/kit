import { z } from 'zod';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';
import { UserCreateOrConnectWithoutUploadedFilesInputObjectSchema } from './UserCreateOrConnectWithoutUploadedFilesInput.schema';
import { UserUpsertWithoutUploadedFilesInputObjectSchema } from './UserUpsertWithoutUploadedFilesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutUploadedFilesInputObjectSchema } from './UserUpdateWithoutUploadedFilesInput.schema';
import { UserUncheckedUpdateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedUpdateWithoutUploadedFilesInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUploadedFilesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutUploadedFilesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutUploadedFilesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUploadedFilesInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutUploadedFilesInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutUploadedFilesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutUploadedFilesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutUploadedFilesNestedInputObjectSchema = Schema;
