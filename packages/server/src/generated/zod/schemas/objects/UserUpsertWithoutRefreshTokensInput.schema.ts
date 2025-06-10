import { z } from 'zod';
import { UserUpdateWithoutRefreshTokensInputObjectSchema } from './UserUpdateWithoutRefreshTokensInput.schema';
import { UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedUpdateWithoutRefreshTokensInput.schema';
import { UserCreateWithoutRefreshTokensInputObjectSchema } from './UserCreateWithoutRefreshTokensInput.schema';
import { UserUncheckedCreateWithoutRefreshTokensInputObjectSchema } from './UserUncheckedCreateWithoutRefreshTokensInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutRefreshTokensInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutRefreshTokensInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutRefreshTokensInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutRefreshTokensInputObjectSchema = Schema;
