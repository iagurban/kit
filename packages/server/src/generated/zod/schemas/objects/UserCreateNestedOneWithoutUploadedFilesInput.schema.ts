import { z } from 'zod';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';
import { UserCreateOrConnectWithoutUploadedFilesInputObjectSchema } from './UserCreateOrConnectWithoutUploadedFilesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

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
