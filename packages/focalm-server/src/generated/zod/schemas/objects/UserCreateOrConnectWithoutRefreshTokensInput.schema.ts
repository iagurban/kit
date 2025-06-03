import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutRefreshTokensInputObjectSchema } from './UserCreateWithoutRefreshTokensInput.schema';
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedCreateWithoutRefreshTokensInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutRefreshTokensInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutRefreshTokensInputObjectSchema = Schema;
