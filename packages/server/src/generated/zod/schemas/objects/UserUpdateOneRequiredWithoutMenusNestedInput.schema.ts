import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutMenusInputObjectSchema } from './UserCreateOrConnectWithoutMenusInput.schema';
import { UserCreateWithoutMenusInputObjectSchema } from './UserCreateWithoutMenusInput.schema';
import { UserUncheckedCreateWithoutMenusInputObjectSchema } from './UserUncheckedCreateWithoutMenusInput.schema';
import { UserUncheckedUpdateWithoutMenusInputObjectSchema } from './UserUncheckedUpdateWithoutMenusInput.schema';
import { UserUpdateWithoutMenusInputObjectSchema } from './UserUpdateWithoutMenusInput.schema';
import { UserUpsertWithoutMenusInputObjectSchema } from './UserUpsertWithoutMenusInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMenusNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutMenusInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutMenusInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMenusInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutMenusInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutMenusInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutMenusInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutMenusNestedInputObjectSchema = Schema;
