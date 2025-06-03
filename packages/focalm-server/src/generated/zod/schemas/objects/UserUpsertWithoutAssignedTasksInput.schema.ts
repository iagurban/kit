import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutAssignedTasksInputObjectSchema } from './UserCreateWithoutAssignedTasksInput.schema';
import { UserUncheckedCreateWithoutAssignedTasksInputObjectSchema } from './UserUncheckedCreateWithoutAssignedTasksInput.schema';
import { UserUncheckedUpdateWithoutAssignedTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAssignedTasksInput.schema';
import { UserUpdateWithoutAssignedTasksInputObjectSchema } from './UserUpdateWithoutAssignedTasksInput.schema';

const Schema: z.ZodType<Prisma.UserUpsertWithoutAssignedTasksInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAssignedTasksInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAssignedTasksInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAssignedTasksInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAssignedTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutAssignedTasksInputObjectSchema = Schema;
