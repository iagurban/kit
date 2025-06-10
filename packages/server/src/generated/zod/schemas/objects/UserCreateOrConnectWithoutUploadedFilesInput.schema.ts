import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutUploadedFilesInputObjectSchema } from './UserCreateWithoutUploadedFilesInput.schema';
import { UserUncheckedCreateWithoutUploadedFilesInputObjectSchema } from './UserUncheckedCreateWithoutUploadedFilesInput.schema';

import type { Prisma } from '../../../old-client';

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
