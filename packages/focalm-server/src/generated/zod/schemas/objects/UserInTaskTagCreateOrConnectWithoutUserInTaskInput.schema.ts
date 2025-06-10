import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './UserInTaskTagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagCreateOrConnectWithoutUserInTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserInTaskTagCreateWithoutUserInTaskInputObjectSchema),
      z.lazy(() => UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema = Schema;
