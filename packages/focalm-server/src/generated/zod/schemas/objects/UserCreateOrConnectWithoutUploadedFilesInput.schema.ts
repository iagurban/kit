import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutUploadedFilesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutUploadedFilesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutUploadedFilesInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutUploadedFilesInputObjectSchema = Schema;
