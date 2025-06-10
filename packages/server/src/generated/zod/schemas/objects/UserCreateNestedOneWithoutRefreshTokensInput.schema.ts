import { z } from 'zod';
import { UserCreateWithoutRefreshTokensInputObjectSchema } from './UserCreateWithoutRefreshTokensInput.schema';
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedCreateWithoutRefreshTokensInput.schema';
import { UserCreateOrConnectWithoutRefreshTokensInputObjectSchema } from './UserCreateOrConnectWithoutRefreshTokensInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutRefreshTokensInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutRefreshTokensInputObjectSchema = Schema;
