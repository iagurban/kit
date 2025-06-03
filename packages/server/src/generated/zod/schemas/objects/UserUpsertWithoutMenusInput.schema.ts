import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutMenusInputObjectSchema } from './UserCreateWithoutMenusInput.schema';
import { UserUncheckedCreateWithoutMenusInputObjectSchema } from './UserUncheckedCreateWithoutMenusInput.schema';
import { UserUncheckedUpdateWithoutMenusInputObjectSchema } from './UserUncheckedUpdateWithoutMenusInput.schema';
import { UserUpdateWithoutMenusInputObjectSchema } from './UserUpdateWithoutMenusInput.schema';

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
