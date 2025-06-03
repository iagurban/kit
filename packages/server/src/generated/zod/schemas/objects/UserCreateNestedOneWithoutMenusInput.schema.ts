import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutMenusInputObjectSchema } from './UserCreateOrConnectWithoutMenusInput.schema';
import { UserCreateWithoutMenusInputObjectSchema } from './UserCreateWithoutMenusInput.schema';
import { UserUncheckedCreateWithoutMenusInputObjectSchema } from './UserUncheckedCreateWithoutMenusInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutMenusInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutMenusInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutMenusInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMenusInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutMenusInputObjectSchema = Schema;
