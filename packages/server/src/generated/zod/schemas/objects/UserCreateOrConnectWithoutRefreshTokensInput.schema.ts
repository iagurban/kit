import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRefreshTokensInputObjectSchema } from './UserCreateWithoutRefreshTokensInput.schema';
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedCreateWithoutRefreshTokensInput.schema';

import type { Prisma } from '../../../old-client';

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
