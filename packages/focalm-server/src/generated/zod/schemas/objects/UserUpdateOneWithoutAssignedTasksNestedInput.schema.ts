import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutAssignedTasksInputObjectSchema } from './UserCreateOrConnectWithoutAssignedTasksInput.schema';
import { UserCreateWithoutAssignedTasksInputObjectSchema } from './UserCreateWithoutAssignedTasksInput.schema';
import { UserUncheckedCreateWithoutAssignedTasksInputObjectSchema } from './UserUncheckedCreateWithoutAssignedTasksInput.schema';
import { UserUncheckedUpdateWithoutAssignedTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAssignedTasksInput.schema';
import { UserUpdateWithoutAssignedTasksInputObjectSchema } from './UserUpdateWithoutAssignedTasksInput.schema';
import { UserUpsertWithoutAssignedTasksInputObjectSchema } from './UserUpsertWithoutAssignedTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutAssignedTasksNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAssignedTasksInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAssignedTasksInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAssignedTasksInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutAssignedTasksInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutAssignedTasksInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAssignedTasksInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneWithoutAssignedTasksNestedInputObjectSchema = Schema;
