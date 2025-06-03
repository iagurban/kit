import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutUploadedFilesInputObjectSchema } from './UserCreateOrConnectWithoutUploadedFilesInput.schema';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutUploadedFilesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutUploadedFilesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutUploadedFilesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUploadedFilesInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutUploadedFilesInputObjectSchema = Schema;
