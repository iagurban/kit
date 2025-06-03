import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutMenusInputObjectSchema } from './UserCreateWithoutMenusInput.schema';
import { UserUncheckedCreateWithoutMenusInputObjectSchema } from './UserUncheckedCreateWithoutMenusInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutMenusInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutMenusInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutMenusInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutMenusInputObjectSchema = Schema;
