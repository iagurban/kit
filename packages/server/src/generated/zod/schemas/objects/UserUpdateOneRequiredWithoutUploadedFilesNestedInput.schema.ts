import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutUploadedFilesInputObjectSchema } from './UserCreateOrConnectWithoutUploadedFilesInput.schema';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedUpdateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedUpdateWithoutUploadedFilesInput.schema';
import { UserUpdateWithoutUploadedFilesInputObjectSchema } from './UserUpdateWithoutUploadedFilesInput.schema';
import { UserUpsertWithoutUploadedFilesInputObjectSchema } from './UserUpsertWithoutUploadedFilesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

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
