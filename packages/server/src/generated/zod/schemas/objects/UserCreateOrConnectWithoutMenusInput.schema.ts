import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutMenusInputObjectSchema } from './UserCreateWithoutMenusInput.schema';
import { UserUncheckedCreateWithoutMenusInputObjectSchema } from './UserUncheckedCreateWithoutMenusInput.schema';

import type { Prisma } from '../../../old-client';

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
