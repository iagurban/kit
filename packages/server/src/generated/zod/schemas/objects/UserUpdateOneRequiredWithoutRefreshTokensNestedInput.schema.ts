import { z } from 'zod';
import { UserCreateWithoutRefreshTokensInputObjectSchema } from './UserCreateWithoutRefreshTokensInput.schema';
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedCreateWithoutRefreshTokensInput.schema';
import { UserCreateOrConnectWithoutRefreshTokensInputObjectSchema } from './UserCreateOrConnectWithoutRefreshTokensInput.schema';
import { UserUpsertWithoutRefreshTokensInputObjectSchema } from './UserUpsertWithoutRefreshTokensInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutRefreshTokensInputObjectSchema } from './UserUpdateWithoutRefreshTokensInput.schema';
import { UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedUpdateWithoutRefreshTokensInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutRefreshTokensInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutRefreshTokensNestedInputObjectSchema = Schema;
