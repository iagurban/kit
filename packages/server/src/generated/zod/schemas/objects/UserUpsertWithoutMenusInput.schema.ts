import { z } from 'zod';
import { UserUpdateWithoutMenusInputObjectSchema } from './UserUpdateWithoutMenusInput.schema';
import { UserUncheckedUpdateWithoutMenusInputObjectSchema } from './UserUncheckedUpdateWithoutMenusInput.schema';
import { UserCreateWithoutMenusInputObjectSchema } from './UserCreateWithoutMenusInput.schema';
import { UserUncheckedCreateWithoutMenusInputObjectSchema } from './UserUncheckedCreateWithoutMenusInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutMenusInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutMenusInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutMenusInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutMenusInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutMenusInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutMenusInputObjectSchema = Schema;
