import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutAuthoredTasksInputObjectSchema } from './UserCreateWithoutAuthoredTasksInput.schema';
import { UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTasksInput.schema';
import { UserUncheckedUpdateWithoutAuthoredTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAuthoredTasksInput.schema';
import { UserUpdateWithoutAuthoredTasksInputObjectSchema } from './UserUpdateWithoutAuthoredTasksInput.schema';

const Schema: z.ZodType<Prisma.UserUpsertWithoutAuthoredTasksInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAuthoredTasksInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAuthoredTasksInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthoredTasksInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutAuthoredTasksInputObjectSchema = Schema;
